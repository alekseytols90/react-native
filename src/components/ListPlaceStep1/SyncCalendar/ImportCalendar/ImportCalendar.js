import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Field, reduxForm, reset } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ImportCalendar.css';
import cx from 'classnames';
import {
  Button,
  FormGroup,
  Col,
  FormControl,
  Modal,
  Panel 
} from 'react-bootstrap';
import validate from './validate';

// Redux Action
import {importiCal} from '../../../../actions/Listing/ImportCalendar';

class ImportCalendar extends React.Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    importiCal: PropTypes.func.isRequired,
    listId: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    return (
      <FormGroup className={s.formGroup}>
        {touched && error && <span className={s.errorMessage}>{error}</span>}
        <FormControl {...input} placeholder={label} type={type} className={className} />
      </FormGroup>
    )
  }

  async submitForm(values, dispatch) {
    const { reset, close, importiCal, listId } = this.props;

    close();
    importiCal(listId, values.name, values.url)
    dispatch(reset('ImportCalendar'));
  }

  render() {
    const { showModal, close, error, handleSubmit, submitting } = this.props;

    return (
      <div>
        <Modal show={showModal} onHide={close} animation={false} className={cx(s.modalContainer, 'ContactHost')}>
          <div className={cx(s.modalTable)}>
            <div className={cx(s.modalCell)}>
              <Modal.Header className={s.modalHeading} closeButton>
                <Modal.Title>Import a New Calendar</Modal.Title>
              </Modal.Header>
              <Modal.Body bsClass={s.logInModalBody}>
                <Panel className={s.panelHeader}>
                  <form onSubmit={handleSubmit(this.submitForm)}>
                    <div className={s.panelBody}>
                      <p className={s.introText}>Import other calendars you use and we’ll automatically keep this listing’s availability up-to-date.</p>
                      <div className={s.space3}>
                        <label className={s.labelText}>Calendar Address (URL)</label>
                        <Field 
                          name="url"
                          type="text"
                          component={this.renderFormControl}
                          label={"Paste Calendar Address (URL) here"}
                          className={s.formControlInput}
                        />
                      </div>
                      <div className={s.space3}>
                        <label className={s.labelText}>Name Your Calendar</label>
                        <Field
                          name="name"
                          type="text"
                          component={this.renderFormControl}
                          label={"Custom name for this calendar"}
                          className={s.formControlInput}
                        />
                      </div>
                      <div className={s.space3}>
                        <Button 
                          className={cx(s.button, s.btnlarge, s.btnPrimary)}
                          type="submit" 
                          disabled={submitting}
                        >
                          Import Calendar
                        </Button>
                      </div>
                    </div>
                  </form>
                </Panel>
              </Modal.Body>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

ImportCalendar = reduxForm({
  form: 'ImportCalendar', // a unique name for this form
  validate
})(ImportCalendar);

const mapState = (state) => ({
});

const mapDispatch = {
  importiCal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ImportCalendar)));
