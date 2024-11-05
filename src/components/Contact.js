import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-5">
      <div className="container">
        <div className="mb-4 mb-5 text-center">
          <h2 className="text-uppercase">Contact</h2>
        </div>
        <div className="row align-items-stretch gx-0">
          <div className="col-lg-6 shadow-inner">
            <form>
              <div className="form-group">
                <input required type="text" className="form-control" name="name" placeholder="Name" />
              </div>
              <div className="form-group">
                <input required type="email" className="form-control" name="email" placeholder="Email" />
              </div>
              <textarea className="form-control" rows="6" name="message_body" placeholder="Message"></textarea>
              <button type="submit" className="btn btn-default">SEND</button>
            </form>
          </div>
          <div className="col-lg-6 shadow-inner">
            <div className="bg-light p-5 h-100">
              <h3><a href="https://orlandogardens.com/">Orlando’s Event Centers</a></h3>
              <p className="text-muted">2050 Dorsett Village Plaza, Maryland Heights, MO 63043</p>
              <ul className="list-unstyled mb-0 text-muted">
                <li className="mb-2"><a href="tel:+3144539000"><i className="text-primary me-3 fas fa-phone"></i><span> (314)453-3900</span></a></li>
                <li className="mb-2"><a href="https://orlandogardens.com/"><i className="text-primary me-3 fas fa-globe-americas"></i><span> Website</span></a></li>
                <li className="mb-2"><a href="mailto:alano@aastl.org"><i className="text-primary me-3 far fa-envelope"></i><span> alano@aastl.org</span></a></li>
              </ul>
              <a href="https://goo.gl/maps/i1cX6wXvMmzcUa3q9" className="btn btn-primary mt-3"><i className="fas fa-map"></i> MAP</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
