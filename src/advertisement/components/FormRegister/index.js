// @flow
// libs
import React, { useState } from 'react';
import TitleHeader from 'components/TitleHeader';
import { Row, Col, Container } from 'react-bootstrap';
import Input from 'components/Input';
import Button from 'components/Button';
import MainLayout from '../../../layout/MainLayout';

export const FormAddAD = () => {
  const [fileName, setFileName] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  console.log(imageUpload);
  const handleChangeFile = e => {
    if (e.target.validity.valid && e.target.files[0]) {
      setImageUpload(
        (window.URL || window.webkitURL).createObjectURL(e.target.files[0])
      );
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <MainLayout>
      <Container fluid className="pb-3 home-main">
        <Row>
          <Col xs={12}>
            <div className="register-device register-ad">
              <TitleHeader title="광고등록" />
              <Row className="row__custom">
                <div className="col-md-3 d-flex align-items-center py-2">
                  <div className="title">제목</div>
                </div>
                <div className="col-md-9 py-2 input-50">
                  <Input type="text" value="광고 승인 요청합니다" />
                </div>
              </Row>
              <Row className="row__custom">
                <div className="col-md-3 d-flex align-items-center py-2">
                  <div className="title">내용</div>
                </div>
                <div className="col-md-9 py-2 input-50">
                  <textarea className="form-control" rows="8" />
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
                      onChange={handleChangeFile}
                    />
                    <p className="custom-file-label">{fileName}</p>
                  </div>
                </div>
              </Row>
            </div>
            <Col className="text-center mt-3">
              <Button variant="primary" type="button" onClick={() => {}}>
                광고신청
              </Button>
            </Col>
          </Col>
        </Row>
      </Container>
      <div className="col-12 text-right mt-5">
        <Button variant="secondary" type="button" onClick={() => {}}>
          취소
        </Button>
      </div>
    </MainLayout>
  );
};

export default FormAddAD;
