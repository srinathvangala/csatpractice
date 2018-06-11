import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {check} from "meteor/check";

export const Qas = new Mongo.Collection("qas");

if(Meteor.isServer) {
    Meteor.publish("qas", function qaPublication(){
        return Qas.find();
    })
}

Meteor.methods({
    "qas.insert"(question, options, answer, explanation) {
        if(!Meteor.userId()){
            throw new Meteor.Error("not-authorized");
        }

        Qas.insert({
            question, 
            options,
            answer,
            explanation,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
        })
    },
    "qas.remove"(qaId) {
        check(qaId, String);
        Qas.remove(qaId);
    }
});