import React from "react";
import "./css/settings.css";
import { Select, Switch } from "antd";
function Settings() {
  const switchChange = () => {
   
  };
  return (
    <div className="settingWrapper">
      <div className="settingcontainer">
       
        <table className="settingTable">
          <thead>
            <tr>
              <td>Permission Description</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {" "}
                <h3>Approve/Reject</h3>
              </td>
              <td>
                <Select
                  defaultValue={"Yes"}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  style={{ width: "150px" }}
                />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <h3>Approve/Reject Notification (Email)</h3>
              </td>
              <td style={{ marginRight: "40px" }}>
                <Switch defaultChecked onChange={switchChange} />
              </td>
            </tr>

            <tr>
              <td>
                {" "}
                <h3>Allow Prescription Upload</h3>
              </td>
              <td>
                <Select
                  defaultValue={"Yes"}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  style={{ width: "150px" }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Staff */}

   
    </div>
  );
}

export default Settings;
