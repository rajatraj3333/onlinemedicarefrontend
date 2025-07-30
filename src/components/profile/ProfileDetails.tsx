import React from 'react'
import Styles from '../css/profiledetail.module.css'
import { useParams,Link } from 'react-router'
function ProfileDetails() {
    const params = useParams().id;
    console.log(params);
  return (
      <div className={`${Styles.profilecontainer}`}>

        <div className={`${Styles.profilesummary}`}>
            <div className={`${Styles.Summary} flex`}>
             <div className={`${Styles.s1}`}>

                 <img src="/image/ashkan-forouzani-DPEPYPBZpB8-unsplash.jpg"/>
                 <p className={`${Styles.mt20}`}>Mukund Bharti</p>
                 <div className={`${Styles.loc} flex mt20`}>
                     <img src="/image/location-icon.png" />
                     <p>New Delhi</p>
                    </div>
                    
                    <p>AIIMS (New Delhi)</p>
                </div>
                <div className={`${Styles.s2}`}>
                   <img src="/image/fb.png" alt=""/>
                   <img src="/image/x.png" alt=""/>
                  
                   <img src="/image/linkdln.png" alt=""/>
                   <p style={{marginLeft: '20px', marginTop: '20px', textDecoration: 'underline'}}>Share</p>
                </div>
              
            </div>

            {/* <!-- Details Summary --> */}
            <div className={`${Styles.profilesummarydetails} flex`} style={{marginTop: '20px', flexWrap: 'wrap'}}>
                <div className={`${Styles.abtspec}`}>
                  <p className={`${Styles.sepcbtn}`}>Sepeciality</p>
<p>
    Neurology stands as one of medicine's most fascinating and complex specialties, dedicated to diagnosing and treating disorders of the nervous system. Neurologists serve as medical detectives, unraveling the mysteries of the brain, spinal cord, and peripheral nerves to help patients navigate some of the most challenging conditions affecting human health and cognition.
</p>

                </div>
                <div className={`${Styles.abthospital}`}>
                   <p className={`${Styles.abthosp}`}>About Hospital</p>
                    <p>
                        The hospital's 24/7 Emergency Department features rapid triage systems and specialized trauma bays, ensuring critical patients receive immediate attention. Advanced diagnostic capabilities include high-resolution MRI and CT scanners, digital X-ray systems, and comprehensive laboratory services that deliver results within hours rather than days.
Patient-centered care remains the cornerstone of Metro General's philosophy, with private rooms equipped with smart beds, integrated entertainment systems, and family accommodation spaces. The facility maintains infection control excellence through HEPA filtration systems, antimicrobial surfaces, and strict sterilization protocols that exceed national standards.
The hospital's specialized departments include a renowned cardiac center with minimally invasive surgical suites, a comprehensive cancer treatment facility featuring linear accelerators for precise radiation therapy, and a women's health pavilion with Level III NICU capabilities.

Technology integration enhances patient experience through electronic health records, telemedicine capabilities, and mobile apps that allow patients to access test results, schedule appointments, and communicate with care teams. The facility also features healing environments with natural lighting, therapeutic gardens, and quiet zones designed to promote recovery.
Quality outcomes speak volumes about Metro General's commitment, with above-average patient satisfaction scores, reduced readmission rates, and national recognition for safety excellence. The hospital's multidisciplinary approach ensures coordinated care across all specialties, 
making it a trusted healthcare destination for the community

</p>
                </div>
            </div>
        </div>
         <div className='flex' style={{justifyContent: 'center', marginTop: '10px',textDecoration:'none'}}>

        <Link className={`${Styles.btnbook}`} to={`/bookings/confirm/${params}`}>Book an appointments</Link>
         </div>
    </div>
   
  )
}

export default ProfileDetails