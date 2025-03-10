import { useState } from "react";
import Modal from "../../../components/Modal";
import FormFooterBtns from "../../../components/buttons/FormFooterBtns";

const SampleTranscript = () => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  return (
    <>
      <div className="col border-30 p-2">
        <p>
          PLEASE NOTE: Please take your time to submit a detailed feedback of
          what exactly happened during your encounter with the visa officer. A
          detailed feedback will enable us to improve our training and offer
          students in the program the best experience at the embassy. Failure to
          provide us with satisfactory feedback will lead to your submission
          being rejected and you will not be able to proceed with any other step
          within the program.
        </p>
      </div>
      <button onClick={toggleModal} className="self-end primary-border-btn">
        Sample Transcript
      </button>
      <Modal title="Sample Transcript" open={open} setOpen={toggleModal}>
        <div className="modal col gap-1 h-[80vh] overflow-y-auto">
          <p>
            My interview was at 10:15 am I arrived at the embassy at 7:15 am. I
            went through the first and second security check seamlessly and
            arrived at the waiting bay at 7:30 am. At 8:20 am I was asked to
            line up inside and only counter 4 and 5 were open. I prayed as I
            waited since the lady VO was only giving denials. Luckily I got
            signaled by the male VO in his 40s and this is how it went.
          </p>
          <p>
            <strong>Attempt:</strong> 1st <br></br>
            <strong>School:</strong> MSU <br></br>
            <strong>Student loan:</strong> Yes <br></br>
            <strong>CoA:</strong> $26682 <br></br>
            <strong>Scholarship:</strong> 4482 <br></br>
            <strong>Status:</strong> Approved <br></br>
            <strong>Embassy:</strong> Nairobi, Kenya <br></br>
          </p>
          <p>
            <strong>Me:</strong> Good morning sir?<br></br>
            <strong>VO:</strong> Good morning to you too.<br></br>
            <strong>VO:</strong> What are you going to study?<br></br>
            <strong>Me:</strong> Masters of Science in Project Management in
            Missouri State University.<br></br>
            <strong>VO:</strong> How did you manage?<br></br>
            <strong>Me :</strong> I graduated with a second class upper division
            with a gpa of 3.4<br></br>
            <strong>VO:</strong> when did you graduate?<br></br>
            <strong>Me:</strong> I graduated in 27th April 2018 sir.<br></br>
            <strong>VO:</strong> What do you do?<br></br>
            <strong>Me:</strong> I am a project manager at xyz (tried to say
            congratulations in Swahili but started laughing at himself)<br></br>
            <strong>Me:</strong> “I laughed too though I didn’t hear what he
            said<br></br>
            <strong>VO:</strong> put your right hand on the scanner<br></br>
            <strong>Me:</strong> Got confused for a moment and put the left but
            he corrected me while smiling<br></br>
            <strong>VO:</strong> Hands me the blue paper<br></br>
            <strong>Me:</strong> I vanished from there….<br></br>
          </p>
          <p>
            My journey has been God throughout, I gave up so many times due to
            finances but my family kept encouraging me. And My God showed up
            today and showed off. What God cannot do does not exist. Those who
            trust in him will never be put to shame. All glory to him. Thanks to
            all who encouraged me and empowered me in one way or another. My
            Kenyan visa preparation group, Dere, Dorcas and the rest. Thank you
            so much.
          </p>
          <FormFooterBtns onClose={toggleModal} hideBtn />
        </div>
      </Modal>
    </>
  );
};
export default SampleTranscript;
