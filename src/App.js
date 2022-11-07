import _ from "lodash";
import { useState } from "react";
import "./styles.css";

const availableInkEffects = {
  inkBleed: "Ink Bleed",
  dustyInk: "Dusty Ink",
  lowInkBlobs: "Low Ink Blobs",
  lowInkLines: "Low Ink Lines",
  blur: "Blur"
};

const availablePaperEffects = {
  cropAndTile: "Crop and Tile",
  noiseTexturize: "Noise Texturize",
  brightnessTexturize: "Brightness Texturize",
  blur: "Blur"
};

const availablePostEffects = {
  lightingGradient: "Lighting Gradient"
};

export default function App() {
  const [inkEffects, setInkEffects] = useState([]);
  const [paperEffects, setPaperEffects] = useState([]);
  const [postEffects, setPostEffects] = useState([]);

  const state = {
    ink: {
      data: inkEffects,
      set: setInkEffects
    },
    paper: {
      data: paperEffects,
      set: setPaperEffects
    },
    post: {
      data: postEffects,
      set: setPostEffects
    }
  };

  const addEffect = (type) => ({ target: { value } }) => {
    const effect = state[type];

    effect.set([...effect.data, value]);
  };

  const clearEffects = (type) => () => state[type].set([]);

  const onSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inkEffects, paperEffects, postEffects })
    };

    fetch(
	"localhost:8000/crappify",
	requestOptions
    ).then((response) => response.json());
  };

  return (
    <div className="App">
      <div className="options">
        <div className="column">
          <select className="add-effect" onChange={addEffect("ink")} value="">
            <option default value="">
              Add Ink Effect
            </option>
            {_.map(availableInkEffects, (name, id) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          <div className="effects-list">
            <div className="effects-header">Ink Effects:</div>
            {_.isEmpty(inkEffects)
              ? "(none)"
              : _.map(inkEffects, (effect, index) => (
                  <div key={`${effect}${index}`}>
                    {availableInkEffects[effect]}
                  </div>
                ))}
          </div>

          <button className="clear-button" onClick={clearEffects("ink")}>
            Clear
          </button>
        </div>

        <div className="column">
          <select className="add-effect" onChange={addEffect("paper")} value="">
            <option default value="">
              Add Paper Effect
            </option>
            {_.map(availablePaperEffects, (name, id) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          <div className="effects-list">
            <div className="effects-header">Paper Effects:</div>
            {_.isEmpty(paperEffects)
              ? "(none)"
              : _.map(paperEffects, (effect, index) => (
                  <div key={`${effect}${index}`}>
                    {availablePaperEffects[effect]}
                  </div>
                ))}
          </div>

          <button className="clear-button" onClick={clearEffects("paper")}>
            Clear
          </button>
        </div>

        <div className="column">
          <select className="add-effect" onChange={addEffect("post")} value="">
            <option default value="">
              Add Post Effect
            </option>
            {_.map(availablePostEffects, (name, id) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          <div className="effects-list">
            <div className="effects-header">Post Effects:</div>
            {_.isEmpty(postEffects)
              ? "(none)"
              : _.map(postEffects, (effect, index) => (
                  <div key={`${effect}${index}`}>
                    {availablePostEffects[effect]}
                  </div>
                ))}
          </div>

          <button className="clear-button" onClick={clearEffects("post")}>
            Clear
          </button>
        </div>
      </div>

      <button className="submit-button" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
}
