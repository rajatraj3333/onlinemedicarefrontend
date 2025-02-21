    <div className="timing">
          <div className="selectTime">
            <DatePicker onChange={dates} disabledDate={disabledate} />
            <button onClick={(e) => setopen(true)} disabled={date===''}>select time</button>
            <span>
              {" "}
              {Time.length > 0
                ? `You selected ${Time} Slot`
                : date==''?"Choose date first":'select time slot'}
            </span>
            <Modal
              title="Basic Modal"
              open={open} // onOk={handleOk}
              onOk={(e) => Time.length && cancel()}
              onCancel={cancel}
              // onOk={Time.length && cancel}
              onClose={cancel}
            >
              <div className="checkBoxesContainer">
                {Array.isArray(bookedslot) && time.map((item) => (
                  <>
                    {
                    bookedslot.length &&
                    bookedslot.includes(item) ? (
                      <div className="checkBoxes">
                        {/* <input type='checkbox' onClick={onChanges} value={element}/><p style={{marginLeft:"0px"}}>{element}</p> */}

                        <button disabled>{item}</button>
                      </div>
                    ) : (
                      <div className="checkBoxes">
                        {/* <input type='checkbox' onClick={onChanges} value={element}/><p style={{marginLeft:"0px"}}>{element}</p> */}

                        <button
                          onClick={(e) => onChanges(e)}
                          value={item}
                          className={item === Time[0] ? "buttonActive" : ""}
                        >
                          {item}
                        </button>
                      </div>
                    )}
                  </>
                ))}
              </div>
              {/* <Checkbox onClick={(e)=>onChanges(e)} value={"test"}>Checkbox</Checkbox> */}
            </Modal>
          </div>

          <div className="mode">
            <h3 style={{ marginBottom: "20px", marginLeft: "10px" }}>
              Select Mode
            </h3>

            <Radio.Group
              onChange={(e) => setMode(e.target.value)}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Radio value={"offline"}>Offline(Walk-In)</Radio>
              <Radio value={"online"} style={{ marginTop: "10px" }}>
                Online
              </Radio>
              <Radio value={"telephonic"} style={{ marginTop: "10px" }}>
                Telephonic
              </Radio>
            </Radio.Group>
          </div>
          <button
            className="btn"
            disabled={mode === "" || !Time.length || date === ""}
            onClick={confirm}
          >
            Confirm
          </button>
        </div>