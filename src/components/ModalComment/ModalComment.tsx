import { Avatar, Comment, Rate, Tooltip } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/configStore';

type Props = {};

export default function ModalComment({}: Props) {
  const { arrComment, arrCommentId } = useSelector((state: RootState) => state.commentReducer);
  const { arrGuest } = useSelector((state: RootState) => state.guestDetailReducer);

  const filterUerComment = (id: number) => {
    let arr = arrGuest.filter((user) => user.id == id);

    return arr[0];
  };

  const renderComment = () => {
    return arrCommentId.map((comment, index) => {
      if (comment.noiDung != '' && comment.ngayBinhLuan.toString() != '') {
        let test = comment.ngayBinhLuan.toString();

        let guestComment = filterUerComment(comment?.maNguoiBinhLuan);

        return (
          <div className="col-12" key={index}>
            <Comment
              className="detail_comment-item modal_comment-item"
              author={
                <a className="detail_comment-item-name">{guestComment == undefined ? 'Ẩn danh' : guestComment?.name}</a>
              }
              avatar={<Avatar src={`https://i.pravatar.cc?u=${comment?.id}`} alt="avatar" />}
              content={<p className="detail_comment-item-text">{comment?.noiDung}</p>}
              datetime={
                <Tooltip title={test}>
                  <span>{test}</span>
                </Tooltip>
              }
            />
          </div>
        );
      }
    });
  };
  return (
    <div>
      <div
        className="modal fade"
        id="modalComment"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl modal-fullscreen-lg-down">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                <div className="detail_comment-rate">
                  <Rate className="detail_rate-star modal_comment-rate-star" allowHalf defaultValue={4.8} disabled />
                  <span className="ms-2 rate_title">4,80</span>
                  <li className="ms-3 rate_title">{arrCommentId.length} đánh giá</li>
                </div>
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body modal_comment-body row">
              <div className="col-lg-6 col-12">
                <div className="detail_comment-process modal_comment-process row">
                  <div className="col-lg-12 col-md-6 col-12">
                    <div className="detail_comment-process-item">
                      <div className="col-6">
                        <p className="m-0 process-text">Mức độ sạch sẽ</p>
                      </div>
                      <div className="col-6">
                        <div className="progress process-item">
                          <div
                            className="progress-bar process-item-bar"
                            role="progressbar"
                            aria-label="Basic example"
                            style={{ width: '95%' }}
                            aria-valuenow={25}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="detail_comment-process-item">
                      <div className="col-6">
                        <p className="m-0 process-text">Giao tiếp</p>
                      </div>
                      <div className="col-6">
                        <div className="progress process-item">
                          <div
                            className="progress-bar process-item-bar"
                            role="progressbar"
                            aria-label="Basic example"
                            style={{ width: '100%' }}
                            aria-valuenow={25}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="detail_comment-process-item">
                      <div className="col-6">
                        <p className="m-0 process-text">Nhận phòng</p>
                      </div>
                      <div className="col-6">
                        <div className="progress process-item">
                          <div
                            className="progress-bar process-item-bar"
                            role="progressbar"
                            aria-label="Basic example"
                            style={{ width: '80%' }}
                            aria-valuenow={25}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-6 col-12">
                    <div className="detail_comment-process-item">
                      <div className="col-6">
                        <p className="m-0 process-text">Độ chính xác</p>
                      </div>
                      <div className="col-6">
                        <div className="progress process-item">
                          <div
                            className="progress-bar process-item-bar"
                            role="progressbar"
                            aria-label="Basic example"
                            style={{ width: '95%' }}
                            aria-valuenow={25}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="detail_comment-process-item">
                      <div className="col-6">
                        <p className="m-0 process-text">Vị trí</p>
                      </div>
                      <div className="col-6">
                        <div className="progress process-item">
                          <div
                            className="progress-bar process-item-bar"
                            role="progressbar"
                            aria-label="Basic example"
                            style={{ width: '100%' }}
                            aria-valuenow={25}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="detail_comment-process-item">
                      <div className="col-6">
                        <p className="m-0 process-text">Giá trị</p>
                      </div>
                      <div className="col-6">
                        <div className="progress process-item">
                          <div
                            className="progress-bar process-item-bar"
                            role="progressbar"
                            aria-label="Basic example"
                            style={{ width: '80%' }}
                            aria-valuenow={25}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12 modal_comment-write">{renderComment()}</div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
