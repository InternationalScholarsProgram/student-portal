<?php

if ($loan_details['status'] == 4 && $ach == 3) {
?>
    <div class="card mt-4" style="border:1px solid green;border-radius:8px;">
        <div class="card-body">
            <?php
            // ✅ Get next actionable unpaid row from loan_schedule
            $nextPaymentRow = null;
            $missedPaymentRow = null;
            $today = date('Y-m-d');

            foreach ($remainingPayments as $row) {
                $scheduleDate = $row['maturity_date'] ?? $row['date'];
                $escapedDate = mysqli_real_escape_string($conn, $scheduleDate);
                $escapedLoanID = mysqli_real_escape_string($conn, $loan_details['loan_id']);

                $statusQuery = "SELECT status FROM loan_schedule WHERE loan_id = '$escapedLoanID' AND date = '$escapedDate' LIMIT 1";
                $statusResult = mysqli_query($conn, $statusQuery);

                $status = 'pending';
                if ($statusResult && $statusRow = mysqli_fetch_assoc($statusResult)) {
                    $status = strtolower($statusRow['status']);
                }

                if ($status !== 'paid') {
                    // Check if it's a missed payment (past due)
                    if ($scheduleDate < $today) {
                        $missedPaymentRow = $row;
                        break;
                    } elseif (!$missedPaymentRow && !$nextPaymentRow) {
                        $nextPaymentRow = $row;
                    }
                }
            }
            ?>

            <?php if ($missedPaymentRow): ?>
                <p>
                    Hi <?php echo htmlspecialchars(get_user_details($conn, $email, 'fullnames')); ?>,<br>
                    ⚠️ You missed a payment of <b>$<?php echo number_format($missedPaymentRow['scheduled_payment'], 2); ?></b> that was due on
                    <b><?php echo date('F d, Y', strtotime($missedPaymentRow['maturity_date'] ?? $missedPaymentRow['date'])); ?></b>.<br>
                    Please clear this missed payment as soon as possible to stay on track with your repayment schedule.
                </p>
            <?php elseif ($nextPaymentRow): ?>
                <p>
                    Hi <?php echo htmlspecialchars(get_user_details($conn, $email, 'fullnames')); ?>,<br>
                    Your next payment of <b>$<?php echo number_format($nextPaymentRow['scheduled_payment'], 2); ?></b> is due on
                    <b><?php echo date('F d, Y', strtotime($nextPaymentRow['maturity_date'] ?? $nextPaymentRow['date'])); ?></b>.<br>
                    You may make a payment now, and your repayment schedule will update automatically.
                </p>
            <?php else: ?>
                <p>
                    Hi <?php echo htmlspecialchars(get_user_details($conn, $email, 'fullnames')); ?>,<br>
                    🎉 All payments have been completed for this loan. Thank you!
                </p>
            <?php endif; ?>



            <div class="row d-flex justify-content-between">
                <div class="col-md-3">
                    <a href="https://finsapsuite.com/login/member/dashboard/relocation_loan_contract/<?php echo $loan_details['loan_contract']; ?>" class="btn btn-success mt-2" target="_blank"><i class="fas fa-eye"></i> View Contract</a>
                </div>
                <div class="col-md-3">
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#extra-modal"><i class="fas fa-money"></i> Extra Loan </button>
                </div>
                <div class="col-md-3">
                    <a href="manual_payment_form.php?email=<?php echo $email; ?>&loan_id=<?php echo $loan_id; ?>" class="btn btn-primary mt-2"><i class="fab fa-telegram"></i> Make payment</a>
                </div>
            </div>
            <div class="container mt-2 pt-5">
                <div class="col-lg-12 text-left" style="height: 100%; width: 100%;">
                    <?php
                    $extra_sql = mysqli_query($conn, "SELECT * FROM extra_loan WHERE email='$test' ORDER BY id DESC LIMIT 1");
                    if (mysqli_num_rows($extra_sql) > 0) {
                        $row_extra = mysqli_fetch_assoc($extra_sql);
                        $extra_status = $row_extra['status'];
                        $loan_date = $row_extra['due_date']; // Format: YYYY-MM-DD

                        // Convert to timestamp
                        $loan_timestamp = strtotime($loan_date);

                        // Get today's date at midnight (00:00:00)
                        $today_timestamp = strtotime(date('Y-m-d'));
                        if ($extra_status == 1) {
                    ?>
                            <div class="card mt-4" style="border:2px solid orange;border-radius:8px;">
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <i class="fas fa-spinner fa-spin"></i> Extra Loan Request Under Review
                                    </h4>
                                    Your loan request has been received and is being processed. If you have any questions, kindly raise a ticket and our team will get back to you.
                                </div>
                            </div>
                        <?php
                        } else if ($extra_status == 2 && $loan_timestamp >= $today_timestamp) {
                        ?>
                            <div class="card mt-4" style="border:2px solid green;border-radius:8px;">
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <i class="fas fa-check"></i> Extra Loan Request Approved
                                    </h4>
                                    We are pleased to inform you that your extra loan request has been approved for <b>USD <?php echo $row_extra['amount']; ?></b>, and the repayment is due on <b><?php echo date("F j, Y", strtotime($row_extra['due_date'])); ?></b>.<br>The amount will be automatically deducted from your account on the due date. Please ensure that you have sufficient funds available to avoid any payment issues.
                                </div>
                            </div>
                    <?php
                        }
                    }
                    ?>
                </div>
            </div>
            <div class="container mt-2 pt-5">
                <div class="col-lg-12 text-left" style="height: 100%; width: 100%;">
                    <?php if (isset($pastPayments) && !empty($pastPayments)) { ?>
                        <h2>Past Payments</h2>
                        <table class="table table-hover table-bordered">
                            <thead class="table-primary text-dark">
                                <tr>
                                    <th>Loan ID</th>
                                    <th>Email</th>
                                    <th>Amount</th>
                                    <th>Date Paid</th>
                                    <th>Payment ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($pastPayments as $payment) { ?>
                                    <tr>
                                        <td><?php echo $payment['loan_id']; ?></td>
                                        <td><?php echo $payment['email']; ?></td>
                                        <td><?php echo number_format((float)$payment['amount'], 2, '.', ''); ?></td>
                                        <td><?php echo $payment['date_paid']; ?></td>
                                        <td><?php echo $payment['payment_id']; ?></td>
                                    </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    <?php } ?>

                    <?php if (isset($remainingPayments)) { ?>
                        <h2>Repayment Schedule</h2>
                        <table class="table table-hover table-bordered">
                            <thead class="table-primary text-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Maturity Date</th>
                                    <th>Starting Balance (USD)</th>
                                    <th>Scheduled Payment (USD)</th>
                                    <th>Interest (USD)</th>
                                    <th>Principal Payment (USD)</th>
                                    <th>New Balance (USD)</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                $totalRemaining = 0;

                                foreach ($remainingPayments as $index => $row) {
                                    $status = getScheduleStatusFromDB($conn, $loan_details['loan_id'], $row['maturity_date']);

                                    if ($status !== 'Paid') {
                                        $totalRemaining += $row['new_balance'];
                                    }

                                    if ($totalRemaining == 0) {
                                        $check = mysqli_query($conn, "SELECT completed_email_sent FROM relocation_loan WHERE loan_id = '{$loan_details['loan_id']}'");
                                        $row = mysqli_fetch_assoc($check);
                                        if ($row && $row['completed_email_sent'] != 1) {
                                            $to = $email;
                                            $subject = "🎉 Loan Fully Paid – Congratulations!";
                                            $fullName = get_user_details($conn, $email, 'fullnames');
                                            $message = "
Hi $fullName,<br><br>
We’re thrilled to inform you that you have <b>successfully completed</b> all payments for your loan <b>{$loan_details['loan_id']}</b>.<br><br>
✅ Your total remaining balance is now: <b>$0.00</b>.<br>
🎉 Thank you for your commitment and timely repayments.<br><br>
Warm regards,<br>
<b>The finKAP Team</b>
";

                                            $headers = "MIME-Version: 1.0\r\n";
                                            $headers .= "Content-type:text/html;charset=UTF-8\r\n";
                                            $headers .= "From: finKAP Loans <no-reply@yourdomain.com>\r\n";

                                            if (mail($to, $subject, $message, $headers)) {
                                                mysqli_query($conn, "UPDATE relocation_loan SET completed_email_sent = 1 WHERE loan_id = '{$loan_details['loan_id']}'");
                                            }
                                        }
                                    }
                                ?>
                                    <tr>
                                        <td><?php echo $index + 1; ?></td>
                                        <td><?php echo htmlspecialchars($row['maturity_date']); ?></td>
                                        <td><?php echo number_format($row['starting_balance'], 2); ?></td>
                                        <td><?php echo number_format($row['scheduled_payment'], 2); ?></td>
                                        <td><?php echo number_format($row['interest_rate'], 2); ?></td>
                                        <td><?php echo number_format($row['principal_payment'], 2); ?></td>
                                        <td><?php echo number_format($row['new_balance'], 2); ?></td>
                                        <td>
                                            <?php if ($status === 'Paid') { ?>
                                                <span class="badge bg-success">Paid</span>
                                            <?php } elseif ($status === 'Not Paid') { ?>
                                                <span class="badge bg-danger">Not Paid</span>
                                            <?php } else { ?>
                                                <span class="badge bg-warning text-dark">Pending</span>
                                            <?php } ?>
                                        </td>
                                    </tr>
                                <?php } ?>

                                <!-- Summary Row -->
                                <tr class="table-secondary">
                                    <td colspan="6" class="text-end fw-bold">Total Remaining to Pay</td>
                                    <td colspan="2"><strong>$<?php echo number_format($totalRemaining, 2); ?></strong></td>
                                </tr>
                            </tbody>
                        </table>
                    <?php } ?>



                </div>
            </div>
        </div>
    </div>
<?php
}





?>