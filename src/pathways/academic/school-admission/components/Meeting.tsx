import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Modal from "../../../../components/Modal";
import { useMemo, useState } from "react";
import PrimaryBtn from "../../../../components/buttons/PrimaryBtn";
import PrimaryBorderBtn from "../../../../components/buttons/PrimaryBorderBtn";
import dayjs from "dayjs";
import CareerAdvisory from "../../../../components/career-advisory/CareerAdvisory";
import ContactSupport from "../../../../components/ContactSupport";

type MeetingPayload = {
  date?: string;            // 'YYYY-MM-DD'
  time?: string;            // 'HH:mm' or 'HH:mm:ss'
  zoom_link?: string;
  reschedule_url?: string;
  cancel_url?: string;
  end_time?: string;
  advisor?: string;
  remark?: string;
  status?: string | number;         // "pending" | "expired" (from meeting API)
  meeting_status?: string | number; // 2 => attended
  end_of_ban?: string | { date?: string };
};

function normalizeHms(t?: string) {
  if (!t) return undefined;
  if (/^\d{2}:\d{2}:\d{2}$/.test(t)) return t;
  if (/^\d{2}:\d{2}$/.test(t)) return `${t}:00`;
  return t;
}

function parseBan(end_of_ban?: string | { date?: string }) {
  if (!end_of_ban) return null;
  if (typeof end_of_ban === "string") return new Date(end_of_ban);
  if (typeof end_of_ban === "object" && end_of_ban?.date)
    return new Date(end_of_ban.date);
  return null;
}

export default function Meeting({
  meeting,
  statusCode,
  meetingCode,
}: {
  meeting?: MeetingPayload | null;
  statusCode?: number;   // overall pipeline status (1/2/3/4/5) from status_check
  meetingCode?: number;  // 200=pending, 3=expired, 4=no pending from check_meeting_status
}) {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen((v) => !v);

  const msg = useMemo(
    () => (meeting && typeof meeting === "object" ? meeting : undefined),
    [meeting]
  );

  // Build timestamps
  const start = useMemo(() => {
    if (!msg?.date || !msg?.time) return null;
    const t = normalizeHms(msg.time);
    return new Date(`${msg.date}T${t}`);
  }, [msg?.date, msg?.time]);

  const now = new Date();
  const joinOpensAt = useMemo(
    () => (start ? new Date(start.getTime() - 30 * 60 * 1000) : null),
    [start]
  );
  const meetingEndsAt = useMemo(
    () => (start ? new Date(start.getTime() + 60 * 60 * 1000) : null),
    [start]
  );

  const ms = Number(msg?.meeting_status); // 2 => attended
  const banUntil = parseBan(msg?.end_of_ban);

  // ===================== RULES =====================
  const attended = ms === 2 || statusCode === 4;

  const upcoming =
    !!start &&
    now < start &&
    (statusCode === 2 || meetingCode === 200) &&
    !attended;

  const missed =
    !!start &&
    now >= start &&
    ms !== 2 &&
    (statusCode === 2 || meetingCode === 3) &&
    !attended;

  const canJoin =
    !!start &&
    !!joinOpensAt &&
    !!meetingEndsAt &&
    now >= joinOpensAt &&
    now <= meetingEndsAt;

  const canRebook = missed && (!!banUntil ? now >= banUntil : true);

  // ===================== RENDERING ======================
  if (attended) {
    return (
      <section className="px-4">
        <h3 className="p-2 font-bold opacity-75 text-lg flex items-center gap-2">
          <CalendarMonthIcon />
          Meeting Successfully Attended
        </h3>
        <div className="card p-4 col gap-1">
          <p>
            Please wait as our team updates the proposed schools for your
            viewing. This process will be completed within the next 24 hours.
          </p>
          <p>Thank you for your patience.</p>
          <ContactSupport />
        </div>
      </section>
    );
  }

  if (upcoming && msg?.date && msg?.time) {
    const joinOpensText =
      joinOpensAt ? dayjs(joinOpensAt).format("dddd, MMMM D, YYYY h:mm A") : null;

    return (
      <main>
        <h3 className="p-2 opacity-70 font-semibold row-center w-fit gap-1">
          <CalendarMonthIcon />
          Upcoming Career Advisory Meeting
        </h3>
        <section className="card col p-3 gap-3">
          <div>
            <p>Greetings,</p>
            <p>
              Your Career Advisory Meeting is scheduled on{" "}
              <b>{dayjs(msg.date).format("dddd, MMMM D, YYYY")}</b> at{" "}
              <b>{normalizeHms(msg.time)}</b>.
            </p>

            {/* NEW: Guidance about when Join + link appear */}
            {!canJoin && (
              <p className="text-sm opacity-80 mt-1">
                You’ll see the <b>Join</b> button and the <b>meeting link</b>{" "}
                appear here <b>30 minutes before</b> the meeting start time
                {joinOpensText ? <> (around <b>{joinOpensText}</b>)</> : null}.
              </p>
            )}
          </div>

          <div className="row justify-end gap-3">
            {msg.reschedule_url && (
              <button onClick={toggleModal} className="text-btn self-end">
                Reschedule Meeting
              </button>
            )}

            {/* Show both Join button and link ONLY when within the 30-min window */}
            {msg.zoom_link && canJoin && (
              <>
                <PrimaryBtn onClick={() => window.open(msg.zoom_link!, "_blank")}>
                  Join Meeting
                </PrimaryBtn>
                <a
                  href={msg.zoom_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary-light self-center"
                >
                  Meeting Link
                </a>
              </>
            )}
          </div>

          <Modal open={open} setOpen={toggleModal} title="Reschedule Meeting">
            <div className="p-3 w-[80vw] md:w-[60vw] xl:w-[45vw] col gap-2">
              <p>
                Kindly note: Please reschedule your meeting if you can't attend
                the current one. Failing to attend a meeting and not
                rescheduling in advance will lead to you <strong>NOT</strong>{" "}
                being able to book another career advisory meeting for{" "}
                <strong>1 day</strong>.
              </p>
              <div className="row justify-end gap-2">
                <PrimaryBorderBtn onClick={toggleModal}>Close</PrimaryBorderBtn>
                {msg?.reschedule_url && (
                  <CareerAdvisory url={msg.reschedule_url} text="Reschedule" />
                )}
              </div>
            </div>
          </Modal>
        </section>
      </main>
    );
  }

  if (missed) {
    return (
      <section className="px-4">
        <h3 className="p-2 font-bold opacity-75 text-lg flex items-center gap-2">
          <CalendarMonthIcon />
          Meeting Not Attended
        </h3>
        <div className="card p-4 col gap-2">
          <p>
            It looks like the meeting time has passed and wasn’t attended.{" "}
            {banUntil && now < banUntil ? (
              <>
                You can request another Career Advisory meeting after{" "}
                <b>{dayjs(banUntil).format("dddd, MMMM D, YYYY h:mm A")}</b>.
              </>
            ) : (
              <>You can now request another Career Advisory meeting.</>
            )}
          </p>
          <div className="row justify-end">
            {canRebook ? (
              <CareerAdvisory text="Request Career Advisory" />
            ) : (
              <ContactSupport />
            )}
          </div>
        </div>
      </section>
    );
  }

  // Fallback
  return (
    <section className="px-4">
      <h3 className="p-2 font-bold opacity-75 text-lg flex items-center gap-2">
        <CalendarMonthIcon />
        Meeting Status
      </h3>
      <div className="card p-4 col gap-1">
        <p>We’re finalizing your meeting details. Please check back soon.</p>
        <ContactSupport />
      </div>
    </section>
  );
}
