import {Template} from "meteor/templating";
import {Qas} from "../api/qas";
import "./homeLayout.html";
import "./addQuestionLayout.html";
import "./qaSingle.js";

Template.body.onCreated(function bodyOnCreated(){
    Meteor.subscribe("qas");
})

Template.homeLayout.helpers({
    qas(){
        return Qas.find({}, {sort:{createdAt:-1}});
    }
});

Template.addQuestionLayout.onCreated(function(){
    this.templateDictionary = new ReactiveDict();
    this.templateDictionary.set("options",[]);
})

Template.addQuestionLayout.helpers({
    options: function(){
        return Template.instance().templateDictionary.get("options");
    }
})
Template.addQuestionLayout.events({
    "keyup #addOption"(event){
        if(event.keyCode == 13){
            var options = Template.instance().templateDictionary.get("options");
            var uniqueId = Date.now();
            options.push({uniqueId:uniqueId, value:event.target.value});
            Template.instance().templateDictionary.set("options", options)
            $(event.target).val("");
        }
    },
    "click .deleteOption i"(event){
        event.stopPropagation();
        $(event.currentTarget).parent().parent().remove();
    },
    "click tr"(event){
        $("tr.selected").removeClass("selected");
        $(event.currentTarget).addClass("selected");
    },
    "click #submitQuestion"(event){
        var question = $("#question").val();
        var options = [];
        var answer = "";
        $( "#optionsTable tr" ).each(function( index ) {
            var uniqueId = $(this).data("uniqueid");
            var option = $(this).data("option");
            options.push({uniqueId:option});
            if($(this).hasClass("selected")){
                answer = uniqueId; 
            }
          });  
        var explanation = $("#explanation").val();
        Meteor.call("qas.insert",question, options, answer, explanation);
        FlowRouter.go('homepage', {});

    }
})
