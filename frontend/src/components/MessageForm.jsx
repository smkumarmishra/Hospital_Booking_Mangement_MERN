import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:5000/api/v1/message/send",
          { firstName, lastName, email, phone, message },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component contact-form">
        <div className="form-shell form-shell--contact">
          <div className="form-shell__aside" aria-hidden="true">
            <div className="form-shell__badge">Contact</div>
            <h2 className="form-shell__asideTitle">We’re here to help</h2>
            <p className="form-shell__asideText">
              Send your query and our support team will get back to you.
            </p>
            <img className="form-shell__asideArt" src="/contact.png" alt="" />
          </div>

          <div className="form-shell__content">
            <div className="form-shell__header">
              <h2 className="form-shell__title">Send Us A Message</h2>
              <p className="form-shell__subtitle">
                Fill the details and write your message below.
              </p>
            </div>

            <form className="form-shell__form" onSubmit={handleMessage}>
              <div className="form-grid2">
                <div className="form-field form-field--icon form-field--user">
                  <label htmlFor="msg-first-name">First Name</label>
                  <input
                    id="msg-first-name"
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-field form-field--icon form-field--user">
                  <label htmlFor="msg-last-name">Last Name</label>
                  <input
                    id="msg-last-name"
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-grid2">
                <div className="form-field form-field--icon form-field--email">
                  <label htmlFor="msg-email">Email</label>
                  <input
                    id="msg-email"
                    type="text"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-field form-field--icon form-field--phone">
                  <label htmlFor="msg-phone">Mobile Number</label>
                  <input
                    id="msg-phone"
                    type="number"
                    placeholder="Mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-field form-field--icon form-field--message form-field--textarea">
                <label htmlFor="msg-message">Message</label>
                <textarea
                  id="msg-message"
                  rows={7}
                  placeholder="Write your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button className="form-shell__btn" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageForm;
