import useFetchUser from "../../services/hooks/useFetchUser";
import { BASE_URL } from "../../services/api/base";
import {
  highSchoolDetails,
  personalInfo,
  programDetails,
  undegraduatedDetails,
} from "./components/utils";
import { finSap } from "../../assets/imageLinks";
import { Avatar } from "@mui/material";
import { FullLoader } from "../../components/loaders/Loader";

function Profile() {
  const { user } = useFetchUser();
  const profilePic = user?.photo
    ? `${BASE_URL}/login/member/imgs/${user?.photo}`
    : finSap;

  if (!user) return <FullLoader />;
console.log(user);

  return (
    <main className="profile">
      <section className="flex sm:flex-row flex-col items-center">
        <div className="col-center w-1/4 lg:w-1/6 mx-4">
          {/* <img
            alt="Profile Photo"
            src={profilePic}
            className="rounded-full aspect-square object-contain outline outline-4 outline-color"
          /> */}
          <Avatar
            alt="Remy Sharp"
            src={profilePic}
            variant="circular"
            sx={{ width: "100%", height: "100%" }}
            className="aspect-square "
          />
        </div>
        <div className="col items-center sm:items-start justify-center gap-2 mx-5">
          <p className="font-semibold text-lg">{user?.fullnames}</p>
          <span className="opacity-50 text-center">
            Membership Number : {user?.member_no}
          </span>
          <span className="opacity-50">Program Option: {user?.package}</span>

          <div className="documents">
            <button>
              <a
                href={`${BASE_URL}/login/member/dashboard/cert.php?email=${user?.email}`}
                target="_blank"
              >
                Membership Certificate
              </a>
            </button>
            <button>
              <a
                href={`${BASE_URL}/login/main/uploads/${user?.credit_report}`}
                target="_blank"
              >
                Credit Report
              </a>
            </button>
            <button>
              <a href={user?.signed_contract || "#"} target="_blank">
                Contract
              </a>
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2>Personal Information</h2>
        <div className="profile-info">
          {personalInfo(user).map((info) => (
            <div key={info.label}>
              <span>{info.label}</span>
              <p>{info.value}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Program option</h2>
        <div className="profile-info">
          {programDetails(user).map((info) => (
            <div key={info.label}>
              <span>{info.label}</span>
              <p>{info.value}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Undegraduate details</h2>
        <div className="profile-info">
          {undegraduatedDetails(user).map((info) => (
            <div key={info.label}>
              <span>{info.label}</span>
              <p>{info.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>High school details</h2>
        <div className="profile-info">
          {highSchoolDetails(user).map((info) => (
            <div key={info.label}>
              <span>{info.label}</span>
              <p>{info.value}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Profile;
