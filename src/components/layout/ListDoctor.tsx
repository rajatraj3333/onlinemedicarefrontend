import permission from "../../utils/permission";
import { Link } from "react-router";
import {
    RiArrowDropDownLine,
    RiArrowDropUpLine,

} from "@remixicon/react";
import React,{useState} from "react";
interface Props {
    roles: string |null
}
export default function Lidoctor({ roles }: Props) {
    const [managedropdown, setmanagedropdown] = useState<boolean>(false);

    return (
        <>
            {roles && permission.dashboard.includes(roles) && (
                <li>
                    <Link to={"admin/"} style={{ textDecoration: "none" }} className="Authlinks">
                        Dashboard{" "}
                    </Link>
                </li>
            )}
            {roles && permission.doctor.includes(roles) && (
                <li>
                    <Link
                        to={"admin/doctor"}
                        style={{ textDecoration: "none" }}
                        className="Authlinks"
                    >
                        Doctor{" "}
                    </Link>
                </li>
            )}

            {roles && permission.emailsetting.includes(roles) && <li>Email Setting</li>}

            {roles && permission.bookinghistory.includes(roles) && (
                <li>
                    {" "}
                    <Link to={"admin/"} style={{ textDecoration: "none" }} className="Authlinks">
                        booking history{" "}
                    </Link>
                </li>
            )}
            {roles && permission.emailsetting.includes(roles) && (
                <li>
                    <Link
                        to={"admin/setting"}
                        style={{ textDecoration: "none" }}
                        className="Authlinks"
                    >
                        Setting
                    </Link>
                </li>
            )}
            { roles && permission.management.includes(roles) && (
                <li onClick={() => setmanagedropdown(!managedropdown)}>
                    Management{" "}
                    {managedropdown ? (
                        <RiArrowDropUpLine />
                    ) : (
                        <RiArrowDropDownLine style={{ marginTop: "0px" }} />
                    )}
                    <ul
                        style={managedropdown ? { display: "block" } : { display: "none" }}
                    >
                        <Link
                            to={"admin/default"}
                            style={{ textDecoration: "none" }}
                            className="Authlinks"
                        >
                            Default
                        </Link>
                        {/* <li>Daily</li> */}
                    </ul>
                </li>
            )}
        </>
    );
}