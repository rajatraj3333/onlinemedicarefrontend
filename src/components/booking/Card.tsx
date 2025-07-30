import React from "react";
import { Link } from "react-router";
import Styles from '../css/card.module.css' 
interface Data {
    fullname: string,
    department: string,
    doctor_id: number
}
interface Props {
    data: Data | string
}
export const Detailscard = (props: Props) => {

    const { data } = props


    return (
        <>
            {Array.isArray(data) && data.map(element => (
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }} key={element._id}>
                    <div className={`${Styles.cardContainer} `} style={{ margin: '40px' }}>
                        <div className={` flex ${Styles.classImg}${Styles.circle}`}>
                            <img src="/image/ashkan-forouzani-DPEPYPBZpB8-unsplash.jpg" className={`${Styles.avimg} ${Styles.circle}`} alt="Doctor Image" />
                        </div>
                        {/* <!-- Doctor Details --> */}
                        <div className={`${Styles.doctdetails}`}>

                            <div className={`${Styles.doctorName} ${Styles.flex}`}>
                                <label>Name-</label>
                                <p> {element.fullname}</p>
                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <img src="/image/location-icon.png" />
                                <p style={{ fontSize: '0.65em', marginTop: '2px' }}>AIIMS(New Delhi)</p>
                            </div>
                            <div style={{ marginTop: '40px', display: 'flex' }}>

                                <div className={`${Styles.specialtylabel} ${Styles.labels}`}>{element.department}</div>
                                <div className={`${Styles.hospitalnamelabel} ${Styles.labels}`}>Medanta</div>
                            </div>
                            <div style={{ marginTop: '40px', display: 'flex' }}>

                                <Link className={`${Styles.booknow} ${Styles.btnset1}`} to={`/bookings/confirm/${element.doctor_id}`}>Book Now</Link>
                                <Link className={`${Styles.aboutdoc} ${Styles.btnset1}`} to={`/profiles/${element.doctor_id}`}>About Doctor</Link>
                            </div>
                        </div>
                    </div>

                </div>


            ))}





        </>

    );
};