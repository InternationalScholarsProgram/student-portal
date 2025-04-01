<td>
    <?php if ($row['status'] == 1) { ?><span class="badge bg-info"> New</span>
    <?php } else if ($row['status'] == 2 || $row['status'] == 4) { ?><span class="badge bg-warning"> On Progress</span>
    <?php } else if ($row['status'] == 3) { ?><span class="badge bg-danger"> Rejected </span>
    <?php } else { ?><span class="badge bg-success"> Completed </span> <?php } ?></td>