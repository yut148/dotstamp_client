import PropTypes from "prop-types"
import React, { Component } from "react"
import {Collapse, Well, Modal, Button, Alert, FormControl, FormGroup} from "react-bootstrap"
export default class Show extends Component {
  /**
     * 閉じる
     */
  close() {
    this.props.closeError()
  }
  /**
     * バグ報告を追加する
     */
  addBugReport() {
    let val = this.input.value.trim()
    if (val == "") {
      return
    }

    this.props.addBugReport({body: val})
  }
  getBugReported() {
    if (!this.props.errorShow.BugReported) {
      return ""
    }

    return (
      <Alert bsStyle="success">
        不具合報告しました。ご協力ありがとうございます。
      </Alert>
    )
  }
  /**
     * 描画する
     *
     * @return {object} html
     */
  render() {
    let bugReport = {}
    if (this.props.errorShow.BugReport) {
      bugReport = {
        disabled: true
      }
    }

    return (
      <Modal show={this.props.errorShow.Show} onHide={() => this.close()}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            Error!!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert bsStyle="danger">
            <strong>{this.props.errorShow.Message}</strong>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.close()}>
            Close
          </Button>
          <br/>
          <br/>
          <Button bsStyle="danger" {...bugReport} onClick={() => this.props.openBugReport()}>
            不具合を報告する
          </Button>
          <br/>
          <br/>
          <Collapse in={this.props.errorShow.BugReport}>
            <Well>
              <FormGroup>
                <FormControl componentClass="textarea" placeholder="不具合の内容" inputRef={ref => {
                  this.input = ref
                }}/>
              </FormGroup>
              <Button bsStyle="danger" onClick={() => this.addBugReport()}>
                報告する
              </Button>
            </Well>
          </Collapse>
          <br/> {this.getBugReported()}
        </Modal.Footer>
      </Modal>
    )
  }
}

Show.propTypes = {
  errorShow: PropTypes.object,
  closeError: PropTypes.func,
  openBugReport: PropTypes.func,
  addBugReport: PropTypes.func
}
