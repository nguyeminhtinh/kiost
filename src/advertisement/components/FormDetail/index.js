// @flow
import React, { memo, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import TitleHeader from 'components/TitleHeader';
import Input from 'components/Input';
import Button from 'components/Button';
import SelectDropdown from 'components/Select';
import listStatus from '../../../constants/listStatus';
import MainLayout from '../../../layout/MainLayout';

type Props = {
  history: {
    push: Function
  }
};

const FormAdvertisementEdit = ({ history }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const handleFile = e => {
    setSelectedImage(e.target.files[0]);
  };
  const handleAdvertisement = () => {
    history.push(`/advertisement`);
  };

  const status = 1;

  return (
    <MainLayout>
      <Container fluid className="pb-3 home-main">
        <Row>
          <Col xs={12}>
            <div className="register-device register-ad">
              {status === 1 && (
                <div className="header-status">
                  <TitleHeader title="광고정보(상세&수정)" />
                  <Button type="button" variant="primary" onClick={() => {}}>
                    승인
                  </Button>
                </div>
              )}
              {status === 2 && (
                <div className="header-status">
                  <TitleHeader title="광고정보(상세&수정)" />
                  <Button type="button" variant="success" onClick={() => {}}>
                    진열대기
                  </Button>
                </div>
              )}
              {status === 3 && (
                <div className="header-status">
                  <TitleHeader title="광고정보" />
                  <Button type="button" variant="danger" onClick={() => {}}>
                    반려
                  </Button>
                </div>
              )}

              <Row className="row__custom">
                <div className="col-md-3 d-flex align-items-center py-2">
                  <div className="title">제목</div>
                </div>
                <div className="col-md-9 py-2">
                  <Input type="text" value="광고 승인 요청합니다" disabled />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-3 d-flex align-items-center py-2">
                  <div className="title">내용</div>
                </div>
                <div className="col-md-9 py-2 input-50">
                  <textarea
                    className="form-control"
                    rows="8"
                    value="삼겹살 광고입니다"
                    disabled
                  />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-3 d-flex align-items-center py-2">
                  <div className="title">파일업로드</div>
                </div>
                <div className="col-md-9 py-2 file-upload">
                  <div className="custom-file" id="customFile">
                    <input
                      type="file"
                      className="custom-file-input"
                      lang="ko"
                      onChange={handleFile}
                      disabled={status === 1 ? status === 2 : true}
                    />
                    <p className="custom-file-label">
                      {selectedImage && selectedImage.name}
                    </p>
                  </div>
                </div>
              </Row>
              {status === 1 && (
                <Row className="row__custom">
                  <div className="col-md-3 d-flex align-items-center py-2">
                    <div className="title">적용상태</div>
                  </div>
                  <div className="col-md-9 py-2 input-50">
                    <SelectDropdown
                      listItem={listStatus}
                      value={selectedStatus}
                      onChange={optionStore => {
                        setSelectedStatus(optionStore && optionStore.value);
                      }}
                      noOptionsMessage={() => '옵션 없음'}
                    />
                  </div>
                </Row>
              )}
              {status === 3 && (
                <Row className="row__custom">
                  <div className="col-md-3 d-flex align-items-center py-2">
                    <div className="title">반려사유</div>
                  </div>
                  <div className="col-md-9 py-2 input-50">
                    <textarea
                      className="form-control"
                      rows="8"
                      value="화면에 적합하지 않은 광고입니다"
                      disabled
                    />
                  </div>
                </Row>
              )}
            </div>
          </Col>
        </Row>
        {status === 1 && (
          <div className="col-12 text-right mt-5 p-0">
            <Button variant="secondary mr-2" type="button" onClick={() => {}}>
              수정
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                handleAdvertisement();
              }}
            >
              취소
            </Button>
          </div>
        )}
        {status === 2 && (
          <div className="col-12 text-right mt-5 p-0">
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                handleAdvertisement();
              }}
            >
              목록
            </Button>
          </div>
        )}
        {status === 3 && (
          <div className="col-12 text-right mt-5 p-0">
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                handleAdvertisement();
              }}
            >
              목록
            </Button>
          </div>
        )}
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(FormAdvertisementEdit);
