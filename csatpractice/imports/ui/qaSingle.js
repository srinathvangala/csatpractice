import {Qas} from "../api/qas";
Template.qaLayout.onCreated(function() {
})

Template.qaLayout.helpers({
    qa(){
        var id=FlowRouter.getParam("_id");
        return Qas.findOne({_id:id});
    }
})