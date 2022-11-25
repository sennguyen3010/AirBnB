import React from 'react';
import { ViTri } from '../../redux/reducers/locationDetailReducer';

type Props = {
  location: ViTri;
};

export default function Modal({ location }: Props) {
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-lg-down">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                <span className="detail_title">Nơi bạn sẽ đến </span>
                <span>
                  ({location?.tenViTri} - {location?.tinhThanh} - {location?.quocGia})
                </span>
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <img className="detail_location" src={location?.hinhAnh} alt="" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
