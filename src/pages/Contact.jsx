import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

export default function Contact() {
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Book Cover Design',
    timeline: '1-3 Months',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.title = 'Commission & Inquiries — § 𝐔 𝐊 𝐈 𝐈';

    // Parse URL query parameter if passed (e.g. ?service=Book%20Cover%20Design or ?subject=...)
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get('service');
    const subjectParam = params.get('subject');

    if (serviceParam) {
      setFormData((prev) => ({ ...prev, service: serviceParam }));
    }
    if (subjectParam) {
      setFormData((prev) => ({
        ...prev,
        message: `Project Context: ${subjectParam}\n\n`
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete all required fields before submitting.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate luxury transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const servicesList = [
    'Book Cover Design',
    'Book Interior Typesetting',
    'Full Cover + Interior System',
    'Editorial Monograph',
    'Typographic Identity',
    'Art Direction & Consultation'
  ];

  const timelineList = ['Immediate (< 1 Month)', '1–3 Months', '3–6 Months', 'Flexible / Later 2026'];

  return (
    <div className="contact-page">
      {/* --- PAGE HEADER --- */}
      <section className="page-header-editorial">
        <div className="container">
          <ScrollReveal>
            <span className="editorial-meta-tag">COMMISSIONS & INQUIRIES</span>
            <h1 className="page-title-editorial">
              LET'S DESIGN SOMETHING <br />
              <span className="font-editorial">Worth Remembering.</span>
            </h1>
            <p className="page-subtitle-editorial">
              Tell us about your manuscript, desired format, and timeline. Every inquiry receives a thoughtful response within 24–48 hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* --- CONTACT & FORM SECTION --- */}
      <section className="contact-section section-pad">
        <div className="container">
          <div className="contact-grid">
            {/* Form Column */}
            <div className="contact-form-col">
              <ScrollReveal>
                {submitted ? (
                  <div className="form-success-box">
                    <span className="success-symbol">❖</span>
                    <h3 className="success-heading">INQUIRY RECEIVED</h3>
                    <p className="success-text">
                      Thank you, <strong>{formData.name}</strong>. Your project brief has been logged into the atelier dispatch queue.
                      We will review your requirements and reply to <strong>{formData.email}</strong> shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          service: 'Book Cover Design',
                          timeline: '1-3 Months',
                          message: ''
                        });
                      }}
                      className="btn-atelier btn-outline-atelier mt-3"
                    >
                      SUBMIT ANOTHER BRIEF
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form" noValidate>
                    {errorMessage && (
                      <div className="form-error-banner">
                        <i className="bi bi-exclamation-triangle"></i> {errorMessage}
                      </div>
                    )}

                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        YOUR NAME / AUTHOR / PUBLISHER <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Eleanor Vance"
                        className="form-control-atelier"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        EMAIL ADDRESS <span className="req">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. eleanor@publisher.com"
                        className="form-control-atelier"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">PRIMARY DISCIPLINE REQUIRED</label>
                      <div className="service-pills-selector">
                        {servicesList.map((srv) => (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => setFormData((prev) => ({ ...prev, service: srv }))}
                            className={`pill-btn ${formData.service === srv ? 'active-pill' : ''}`}
                          >
                            {srv}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">TARGET LAUNCH TIMELINE</label>
                      <div className="timeline-selector-row">
                        {timelineList.map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setFormData((prev) => ({ ...prev, timeline: t }))}
                            className={`timeline-pill ${formData.timeline === t ? 'active-timeline' : ''}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        PROJECT SYNOPSIS & VISION <span className="req">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Provide details on your book's genre, themes, page count, and any aesthetic references you admire..."
                        className="form-control-atelier textarea-atelier"
                        required
                      ></textarea>
                    </div>

                    <div className="form-submit-row">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-atelier btn-primary-atelier btn-block-submit"
                      >
                        {isSubmitting ? (
                          <span>TRANSMITTING BRIEF...</span>
                        ) : (
                          <>
                            <span>TRANSMIT COMMISSION BRIEF</span>
                            <i className="bi bi-arrow-right"></i>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </ScrollReveal>
            </div>

            {/* Sidebar Column */}
            <div className="contact-sidebar-col">
              <ScrollReveal delay={150}>
                <div className="sidebar-atelier-card">
                  <span className="editorial-meta-tag">COMMISSION ADVISORY</span>
                  <h3 className="sidebar-card-title">Atelier Availability</h3>
                  <p className="sidebar-card-desc">
                    We maintain an intentionally restricted commission calendar to devote meticulous attention to each project's
                    materiality, typographic nuances, and press supervision.
                  </p>

                  <div className="sidebar-metrics">
                    <div className="s-metric-item">
                      <span className="s-metric-num">2026</span>
                      <span className="s-metric-label">CURRENT SLATE OPEN</span>
                    </div>
                    <div className="s-metric-item">
                      <span className="s-metric-num">24–48h</span>
                      <span className="s-metric-label">RESPONSE WINDOW</span>
                    </div>
                  </div>

                  <div className="sidebar-divider"></div>

                  <div className="sidebar-channels">
                    <span className="s-channel-heading">DISPATCH PROTOCOL</span>
                    <div className="s-channel-row">
                      <span className="s-channel-key">DIRECT DESK:</span>
                      <span className="s-channel-val">atelier@sukii-design.com</span>
                    </div>
                    <div className="s-channel-row">
                      <span className="s-channel-key">HOURS:</span>
                      <span className="s-channel-val">09:00 — 18:00 CET</span>
                    </div>
                    <div className="s-channel-row">
                      <span className="s-channel-key">CONSULTATIONS:</span>
                      <span className="s-channel-val">By Confirmed Appointment</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
