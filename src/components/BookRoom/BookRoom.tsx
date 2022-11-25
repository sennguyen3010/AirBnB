import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { getBookRoomApi, postBookRoomApi } from '../../redux/reducers/roomDetailReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/configStore';
import { useAppSelector } from '../../redux/hooks';
import { history } from '../..';
import { getStoreJSON, USER_LOGIN } from '../../util/setting';
import { openNotificationWithIcon } from '../Notification/Notification';

const { RangePicker } = DatePicker;

export interface GuestsNumber {
  nguoiLon: number;
  treEm: number;
  emBe: number;
  thuCung: number;
}

type Props = {};

export default function BookRoom({}: Props) {
  const [close, setClose] = useState(false);
  let dispatch: AppDispatch = useDispatch();
  const [date, setDate] = useState({ ngayDen: '', ngayDi: '' });
  const [totalDate, setTotalDate] = useState(0);
  let { room } = useAppSelector((state) => state.roomDetailReducer);
  let [roomDetail] = [...room];

  const { arrBookRoom } = useSelector((state: RootState) => state.roomDetailReducer);
  const { arrCommentId } = useSelector((state: RootState) => state.commentReducer);
  let userLogin = getStoreJSON(USER_LOGIN);

  const [guestsNumber, setGuestsNumber] = useState({
    nguoiLon: 1,
    treEm: 0,
    emBe: 0,
    thuCung: 0,
  });
  const { nguoiLon, treEm, emBe, thuCung } = guestsNumber;

  const amountGuest = (value: boolean, text: string) => {
    let NL = guestsNumber.nguoiLon;
    let TE = guestsNumber.treEm;
    let EB = guestsNumber.emBe;
    let TC = guestsNumber.thuCung;

    if (value) {
      switch (text) {
        case 'nguoiLon':
          if (nguoiLon < roomDetail.khach - treEm) {
            NL = guestsNumber.nguoiLon += 1;
          }
          break;
        case 'treEm':
          if (treEm < roomDetail.khach - nguoiLon) {
            TE = guestsNumber.treEm += 1;
          }
          break;
        case 'emBe':
          EB = guestsNumber.emBe += 1;
          break;
        case 'thuCung':
          TC = guestsNumber.thuCung += 1;
          break;
      }
    } else {
      if (text == 'nguoiLon' && guestsNumber.nguoiLon >= 2) {
        NL = guestsNumber.nguoiLon -= 1;
      }
      if (text == 'treEm' && guestsNumber.treEm >= 1) {
        TE = guestsNumber.treEm -= 1;
      }
      if (text == 'emBe' && guestsNumber.emBe >= 1) {
        EB = guestsNumber.emBe -= 1;
      }
      if (text == 'thuCung' && guestsNumber.thuCung >= 1) {
        TC = guestsNumber.thuCung -= 1;
      }
    }
    setGuestsNumber({ nguoiLon: NL, treEm: TE, emBe: EB, thuCung: TC });
  };

  let dates = [
    {
      ngayDen: '2022-10-01',
      ngayDi: '2022-10-02',
    },
  ];

  arrBookRoom.map((item, index) => {
    let obj = {
      ngayDen: item.ngayDen.toString(),
      ngayDi: item.ngayDi.toString(),
    };

    dates.push(obj);
  });

  const getDaysBetweenDates = function (startDate: any, endDate: any) {
    let now = startDate.clone(),
      datess = [];

    while (now.isSameOrBefore(endDate)) {
      datess.push(now.format('YYYY-MM-DD'));
      now.add(1, 'days');
    }
    return datess;
  };
  let dateList = dates.map((day) => getDaysBetweenDates(moment(day.ngayDen), moment(day.ngayDi)));

  let arrDayDisable = dateList.flatMap((a) => a);

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    let index = arrDayDisable.findIndex((date) => date === moment(current).format('YYYY-MM-DD'));
    return (current && current < moment().endOf('day')) || (index !== -1 && true);
  };

  const onChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
    if (dates) {
      setDate({
        ngayDen: moment.utc(dateStrings[0], 'YYYY-MM-DD').format('YYYY-MM-DD'),
        ngayDi: moment.utc(dateStrings[1], 'YYYY-MM-DD').format('YYYY-MM-DD'),
      });
      setTotalDate(
        moment.duration(moment(dateStrings[1], 'YYYY-MM-DD').diff(moment(dateStrings[0], 'YYYY-MM-DD'))).asDays()
      );
    } else {
      console.log('Clear');
    }
  };

  const countGuest = (value: boolean, text: string) => {
    amountGuest(value, text);
  };

  const submitBookRoom = () => {
    if (userLogin) {
      let booked = {
        id: 0,
        maPhong: roomDetail?.id,
        ngayDen: date.ngayDen,
        ngayDi: date.ngayDi,
        soLuongKhach: guestsNumber.nguoiLon + guestsNumber.treEm,
        maNguoiDung: userLogin?.user?.id,
      };
      if (booked.ngayDen != '' && booked.ngayDi) {
        const action = postBookRoomApi(booked);
        dispatch(action);
      } else {
        openNotificationWithIcon('info', 'Chưa đủ thông tin', 'Vui lòng nhập đầy đủ thông tin đặt phòng!');
      }
    } else {
      openNotificationWithIcon('info', 'Vui lòng đăng nhập để tiếp tục đặt phòng', 'Đi đến trang đăng nhập');
      history.push('/login');
    }
  };

  useEffect(() => {
    const action = getBookRoomApi();
    dispatch(action);
  }, [roomDetail?.id, dispatch]);

  const handleCloseTab = () => {
    setClose(!close);
  };
  return (
    <div className="col-md-4 col-12">
      <div className="detail_book">
        <div className="detail_book-layout">
          <div className="detail_book-header">
            <div className="detail_book-header-price">
              <span className="header_price">${roomDetail?.giaTien}</span> <span>đêm</span>
            </div>
            <div className="detail_book-header-rate">
              <span>
                <i className="fas fa-star detail_rate-star"></i> <span>4,80</span>
              </span>
              <li className="ms-2">
                <a className="detail_rate-note" href="#detailComment">
                  {arrCommentId.length} đánh giá
                </a>
              </li>
            </div>
          </div>

          <div className="detail_book-body">
            <div className="detail_book-body-date">
              <RangePicker
                placeholder={['Nhận phòng', 'Trả phòng']}
                placement="bottomRight"
                disabledDate={disabledDate}
                onChange={onChange}
              />
            </div>

            <div className="detail_book-body-guest accordion accordion-flush" id="accordionFlushExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className="detail_guest-btn accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    <p className="guest_text-bold mb-2">Khách</p>
                    <p className="detail_guest-btn-amount">
                      {nguoiLon + treEm} khách
                      <span>{emBe >= 1 ? `, ${emBe} em bé` : ''}</span>
                      <span>{thuCung >= 1 ? `, ${thuCung} thú cưng` : ''}</span>
                    </p>
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className={`${'close_tab' && close} detail_guest-layout accordion-collapse collapse`}
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <div className="detail_guest-item">
                      <div className="detail_guest-item-text">
                        <p className="guest_text-bold">Người lớn</p>
                        <p className="guest_text-regular">Từ 13 tuổi trở lên</p>
                      </div>
                      <div className="detail_guest-item-number">
                        <button onClick={() => countGuest(true, 'nguoiLon')} className="guest_btn">
                          +
                        </button>
                        <p>{guestsNumber.nguoiLon}</p>
                        <button onClick={() => countGuest(false, 'nguoiLon')} className="guest_btn">
                          -
                        </button>
                      </div>
                    </div>

                    <div className="detail_guest-item">
                      <div className="detail_guest-item-text">
                        <p className="guest_text-bold">Trẻ em</p>
                        <p className="guest_text-regular">Độ tuổi 2 - 12</p>
                      </div>
                      <div className="detail_guest-item-number">
                        <button onClick={() => countGuest(true, 'treEm')} className="guest_btn">
                          +
                        </button>
                        <p>{treEm}</p>
                        <button onClick={() => countGuest(false, 'treEm')} className="guest_btn">
                          -
                        </button>
                      </div>
                    </div>

                    <div className="detail_guest-item">
                      <div className="detail_guest-item-text">
                        <p className="guest_text-bold">Em bé</p>
                        <p className="guest_text-regular">Dưới 2 tuổi</p>
                      </div>
                      <div className="detail_guest-item-number">
                        <button onClick={() => countGuest(true, 'emBe')} className="guest_btn">
                          +
                        </button>
                        <p>{emBe}</p>

                        <button onClick={() => countGuest(false, 'emBe')} className="guest_btn">
                          -
                        </button>
                      </div>
                    </div>

                    <div className="detail_guest-item">
                      <div className="detail_guest-item-text">
                        <p className="guest_text-bold">Thú cưng</p>
                      </div>
                      <div className="detail_guest-item-number">
                        <button onClick={() => countGuest(true, 'thuCung')} className="guest_btn">
                          +
                        </button>
                        <p>{thuCung}</p>

                        <button onClick={() => countGuest(false, 'thuCung')} className="guest_btn">
                          -
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="mt-4">
                        Chỗ ở này cho phép tối đa {roomDetail?.khach} khách, không tính em bé. Được phép mang theo thú
                        cưng.
                      </p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="detail_guest-btn-close" onClick={handleCloseTab}>
                        Đóng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button onClick={submitBookRoom} className="detail_book-body-btnSubmit">
                Đặt phòng
              </button>
            </div>
            <p className="detail_book-body-note">Bạn vẫn chưa bị trừ tiền</p>

            <div className="detail_book-body-des d-flex justify-content-between">
              <div>
                <span>
                  ${roomDetail?.giaTien} x {totalDate} đêm
                </span>
              </div>
              <p>${roomDetail?.giaTien * totalDate}</p>
            </div>

            <div className="detail_book-body-des d-flex justify-content-between">
              <div>
                <span>Giảm giá theo tuần</span>
              </div>
              <p>$0</p>
            </div>

            <div className="detail_book-body-des d-flex justify-content-between">
              <div>
                <span>Phí dịch vụ</span>
              </div>
              <p>$0</p>
            </div>

            <hr />
          </div>

          <div className="detail_book-total d-flex justify-content-between">
            <p>Tổng trước thuế</p>
            <p>${roomDetail?.giaTien * totalDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
