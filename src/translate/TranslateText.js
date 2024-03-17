import translate from "translate";

const Translatetext = async (value) => {
  translate.engine = "google";
  try {
    const text = await translate(value, "ar");
    return text;
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
};

export default Translatetext;
