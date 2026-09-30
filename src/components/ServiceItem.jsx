import React from 'react';
import { Link } from 'react-router-dom';

export default function ServiceItem({ service, isOpen, onToggle }) {
  return (
    <div className={`editorial-service-item ${isOpen ? 'open' : ''}`}>
      <div className="editorial-service-header" onClick={onToggle}>
        <div className="service-meta-left">
          <span className="service-index">{service.num}</span>
          <h3 className="service-title">{service.title}</h3>
        </div>
        <span className="service-tag d-none d-md-inline">{service.tag}</span>
        <i className="bi bi-plus-lg service-toggle-icon" />
      </div>
      <div className="service-body-collapse">
        <p className="text-secondary" style={{ maxWidth: '800px', lineHeight: '1.85' }}>
          {service.overview}
        </p>
        <h5 className="font-mono text-meta text-white mt-4 mb-2">Deliverables:</h5>
        <ul className="service-deliverables-list">
          {service.deliverables.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <div className="mt-4">
          <Link
            to={`/contact?subject=${encodeURIComponent(service.inquirySubject)}`}
            className="btn-editorial btn-editorial-sm btn-editorial-solid"
          >
            Commission Discipline <i className="bi bi-arrow-right ms-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
