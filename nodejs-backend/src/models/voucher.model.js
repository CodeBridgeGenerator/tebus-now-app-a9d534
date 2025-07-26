
    module.exports = function (app) {
        const modelName = 'voucher';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            id: { type:  String , required: true },
categoryId: { type: Schema.Types.ObjectId, ref: "category" },
points: { type: Number, required: false, max: 10000000 },
title: { type:  String , required: true },
image: { type:  String , required: true },
description: { type:  String , required: true },
termsAndCondition: { type:  String , required: true },
isLatest: { type:  String , required: true },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };