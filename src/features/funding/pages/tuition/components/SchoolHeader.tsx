function SchoolHeader({ school }: any) {
  return (
    <div className="alert my-2 text-sm">
      <p className="text-sm">
        <b>School</b> : {school?.school_name}
      </p>
      <p className="text-sm">
        <b>Program</b>: {school?.program_name}
      </p>
    </div>
  );
}

export default SchoolHeader;
