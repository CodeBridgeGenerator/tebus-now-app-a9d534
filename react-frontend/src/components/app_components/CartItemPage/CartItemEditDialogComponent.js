import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const CartItemCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [voucherId, setVoucherId] = useState([])
const [userId, setUserId] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount voucher
                    client
                        .service("voucher")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleVoucherId } })
                        .then((res) => {
                            setVoucherId(res.data.map((e) => { return { name: e['id'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Voucher", type: "error", message: error.message || "Failed get voucher" });
                        });
                }, []);
 useEffect(() => {
                    //on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setUserId(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            id: _entity?.id,
voucherId: _entity?.voucherId?._id,
userId: _entity?.userId?._id,
Quantity: _entity?.Quantity,
        };

        setLoading(true);
        try {
            
        await client.service("cartItem").patch(_entity._id, _data);
        const eagerResult = await client
            .service("cartItem")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "voucherId",
                    service : "voucher",
                    select:["id"]},{
                    path : "userId",
                    service : "users",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info cartItem updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const voucherIdOptions = voucherId.map((elem) => ({ name: elem.name, value: elem.value }));
const userIdOptions = userId.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit CartItem" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="cartItem-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="id">Id:</label>
                <InputText id="id" className="w-full mb-3 p-inputtext-sm" value={_entity?.id} onChange={(e) => setValByKey("id", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["id"]) && (
              <p className="m-0" key="error-id">
                {error["id"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="voucherId">VoucherId:</label>
                <Dropdown id="voucherId" value={_entity?.voucherId?._id} optionLabel="name" optionValue="value" options={voucherIdOptions} onChange={(e) => setValByKey("voucherId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["voucherId"]) && (
              <p className="m-0" key="error-voucherId">
                {error["voucherId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="userId">UserId:</label>
                <Dropdown id="userId" value={_entity?.userId?._id} optionLabel="name" optionValue="value" options={userIdOptions} onChange={(e) => setValByKey("userId", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["userId"]) && (
              <p className="m-0" key="error-userId">
                {error["userId"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="Quantity">Quantity:</label>
                <InputNumber id="Quantity" className="w-full mb-3" value={_entity?.Quantity} onChange={(e) => setValByKey("Quantity", e.value)}  useGrouping={false} />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["Quantity"]) && (
              <p className="m-0" key="error-Quantity">
                {error["Quantity"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(CartItemCreateDialogComponent);
