import openai from "../openai.js";

async function chooseModel(model1, model2) {
  // Get the rate limits and usage for first model
  const rateLimits1 = await openai.rateLimits(model1);

  // Calculate the remaining capacity for each model
  const capacity1 = rateLimits1.tpm - rateLimits1.tokens;

  // Check if the first model meets the criteria
  const criteria1 =
    rateLimits1.rpm > 1 &&
    rateLimits1.tpm > 1000 &&
    rateLimits1.rpd > 1 &&
    rateLimits1.tpd > 1000;

  // Choose model 1 if have enough capacity left and meet the criteria
  if (capacity1 > 1000 && criteria1) {
    return model1;
  } else {
    return model2;
  }
}

export default chooseModel;
