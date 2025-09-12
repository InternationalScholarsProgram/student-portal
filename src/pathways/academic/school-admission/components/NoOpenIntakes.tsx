import TelegramIcon from "@mui/icons-material/Telegram";
import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";

function NoOpenIntakes() {
  return (
    <main>
      <div className="card col p-6">
        <h3 className="text-2xl font-semibold opacity-75">
          No Intakes Currently Open
        </h3>
        <p>
          We currently don't have any open school intakes. Please check back
          soon for updates on upcoming intakes.
        </p>
        <p>
          Stay tuned! You can also join our telegram group to be notified when
          the next intake opens.
        </p>
        <PrimaryBtn
          className="self-end row-center gap-2"
          onClick={() =>
            window.open("https://t.me/+0jwhmTwF2zU0Mzlh", "_blank")
          }
        >
          <TelegramIcon />
          Join Our Telegram
        </PrimaryBtn>
      </div>
    </main>
  );
}

export default NoOpenIntakes;
