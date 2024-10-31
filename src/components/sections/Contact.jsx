import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(2px) scale(1);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ErrorMessage = styled.div`
  font-size: 16px;
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const SuccessMessage = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  margin-top: 20px;
`;

const Contact = () => {
  const form = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    const formElements = form.current.elements;
    const email = formElements.from_email.value;
    const name = formElements.from_name.value;
    const subject = formElements.subject.value;
    const message = formElements.message.value;

    if (!email || !name || !subject || !message) {
      setError("All fields are required.");
      console.error("Validation Error: All fields are required.");
      return false;
    }

    // Basic email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      console.error("Validation Error: Invalid email format.");
      return false;
    }

    setError(""); // Clear error if validation passes
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    emailjs
      .sendForm(
        "service_k6ix10f",
        "template_4cdx2ik",
        form.current,
        "DmTTJj3yOLWWgXaGX"
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setIsSubmitted(true); // Show success message
        },
        (error) => {
          console.error("Email send error:", error);
          setError("An error occurred while sending your message. Please try again.");
        }
      );
  };

  useEffect(() => {
    if (isSubmitted && form.current) {
      form.current.reset();
    }
  }, [isSubmitted]);

  return (
    <Container id="Contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc style={{ marginBottom: "40px" }}>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        {isSubmitted ? (
          <SuccessMessage>✨ Thank you for reaching out! I'll be in touch soon! ✨</SuccessMessage>
        ) : (
          <ContactForm ref={form} onSubmit={handleSubmit}>
            <ContactTitle>Email Me 🚀</ContactTitle>
            <ContactInput type="email" placeholder="Your Email" name="from_email" required />
            <ContactInput type="text" placeholder="Your Name" name="from_name" required />
            <ContactInput type="text" placeholder="Subject" name="subject" required />
            <ContactInputMessage placeholder="Message" name="message" rows={4} required />
            <ContactButton type="submit" value="Send" />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </ContactForm>
        )}
      </Wrapper>
    </Container>
  );
};

export default Contact;
