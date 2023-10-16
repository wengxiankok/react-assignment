import React from 'react';

const MyModal = ({ videoUrl, onClose }) => {
  return (
    <div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="position-relative modal-body p-0">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe width="100%" height="500px" className="embed-responsive-item" src={videoUrl} title="Trailer"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyModal;
