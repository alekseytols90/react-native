import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Table, TBody, TR, TD} from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import {url, sitename} from '../../../config';

class BookingExpiredGuest extends Component {
    static propTypes = {
		content: PropTypes.shape({
			listTitle: PropTypes.string.isRequired,
			guestName: PropTypes.string.isRequired,
			checkIn: PropTypes.string.isRequired,
			confirmationCode: PropTypes.number.isRequired,
		}).isRequired
    };

    render() {
    	const textStyle = {
	      color: '#484848',
	      backgroundColor: '#F7F7F7',
	      fontFamily: 'Arial',
	      fontSize: '16px',
	      padding: '35px',
	    };


	    const { content: {guestName, listTitle, confirmationCode, checkIn } } = this.props;
	    let checkInDate = checkIn != null ? moment(checkIn).format('ddd, Do MMM, YYYY') : '';
        return (
					<Layout>
						<Header color="rgb(255, 90, 95)" backgroundColor="#F7F7F7" />
						<div>
							<Table width="100%" >
								<TBody>
									<TR>
										<TD style={textStyle}>
											<EmptySpace height={20} />
											<div>
												Hi {guestName},
					        		</div>
											<EmptySpace height={20} />
											<div>
												We regret to inform you that your request at {listTitle}
												{' '}{confirmationCode} starting on {checkInDate} has expired. You will be fully refunded and notified.
					        		</div>
											<EmptySpace height={40} />
											<div>
												Regards, <br />
												The {sitename} Team
					        		</div>
										</TD>
									</TR>
								</TBody>
							</Table>
							<EmptySpace height={40} />
						</div>
						<Footer />
						<EmptySpace height={20} />
					</Layout>
        );
    }
}

export default BookingExpiredGuest;
