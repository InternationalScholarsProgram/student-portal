const Address = ({ email }: { email?: string }) => {
  return (
    <div className="col w-fit">
      <strong>The International Scholars Program</strong>
      <b>100 S. Ashley Drive, Suite 600,</b>
      <b>Tampa, FL, 33602</b>
      <b>Tel: +1 (813) 333 1080 </b>
      <b>Email: {email || "funding@internationalscholarsprogram.com"}</b>
    </div>
  );
};

export default Address;
