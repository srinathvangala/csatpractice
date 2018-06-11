import {Template} from "meteor/templating";
import "../../ui/qaLayout.html";
import "../../ui/mainLayout.html";
import "../../ui/homeLayout.html";
import "../../ui/addQuestionLayout.html";

FlowRouter.route("/",{
    name: "homepage",
    action(params, queryparams){
        BlazeLayout.render("mainLayout", {main:"homeLayout"});
    }
})

FlowRouter.route("/question/:_id",{
    name: "question.show",
    action(params, queryparams){
        BlazeLayout.render("mainLayout", {main:"qaLayout"});
    }
})

FlowRouter.route("/addquestion/",{
    name: "question.add",
    action(params, queryparams){
        BlazeLayout.render("mainLayout", {main:"addQuestionLayout"});
    }
})