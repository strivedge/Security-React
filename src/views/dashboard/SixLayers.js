import React from "react";

import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

import { SixlayerData } from "../sampleData/mockData";

function Sixlayers() {
  const handleLayersAction = (title) => {
    //do something here when click on the the layer
  };

  const selectColor = (value) => {
    let color = "";
    SixlayerData.SixLayersGraphData.forEach((item) => {
      if (item.Cat === value) {
        let val = item.Percent;
        if (val >= 0 && val <= 10) return (color = "#fa5335");
        else if (val >= 11 && val <= 30) return (color = "#ea5e13");
        else if (val >= 31 && val <= 50) return (color = "#e5b40f");
        else if (val >= 51 && val <= 70) return (color = "#e5d70f");
        else if (val >= 71 && val <= 90) return (color = "#9cc904");
        else if (val >= 91 && val <= 100) return (color = "#3cc904");
      }
    });
    return color;
  };
  return (
    <>
      <Card className="p-3 layers-shape">
        <CardHeader>
          <CardTitle tag="h3">Defense in depth overview</CardTitle>
          <a href="/" className="text-white export-btn">
            Export to PDF
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="15"
              height="15"
              viewBox="0 0 226 226"
            >
              <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: "normal" }}
              >
                <path d="M0,226v-226h226v226z" fill="none" />
                <g id="original-icon" fill="#ffffff">
                  <path d="M150.99625,0c-2.48953,0.22953 -4.32578,2.45422 -4.09625,4.94375c0.22953,2.48953 2.45422,4.32578 4.94375,4.09625h58.61875l-94.355,94.49625c-1.34188,1.09469 -1.95984,2.84266 -1.57141,4.53766c0.38844,1.67734 1.71266,3.00156 3.39,3.39c1.695,0.38844 3.44297,-0.22953 4.53766,-1.57141l94.49625,-94.355v58.61875c-0.01766,1.62437 0.82984,3.14281 2.24234,3.97266c1.4125,0.81219 3.14281,0.81219 4.55531,0c1.4125,-0.82984 2.26,-2.34828 2.24234,-3.97266v-74.15625h-74.15625c-0.14125,0 -0.2825,0 -0.42375,0c-0.14125,0 -0.2825,0 -0.42375,0zM9.04,45.2c-2.36594,0 -4.78484,0.82984 -6.4975,2.5425c-1.71266,1.71266 -2.5425,4.13156 -2.5425,6.4975v162.72c0,2.36594 0.82984,4.78484 2.5425,6.4975c1.71266,1.71266 4.13156,2.5425 6.4975,2.5425h162.72c2.36594,0 4.78484,-0.82984 6.4975,-2.5425c1.71266,-1.71266 2.5425,-4.13156 2.5425,-6.4975v-135.6c0.01766,-1.62437 -0.82984,-3.14281 -2.24234,-3.97266c-1.4125,-0.81219 -3.14281,-0.81219 -4.55531,0c-1.4125,0.82984 -2.26,2.34828 -2.24234,3.97266v135.6h-162.72v-162.72h135.6c1.62437,0.01766 3.14281,-0.82984 3.97266,-2.24234c0.81219,-1.4125 0.81219,-3.14281 0,-4.55531c-0.82984,-1.4125 -2.34828,-2.26 -3.97266,-2.24234z"></path>
                </g>
              </g>
            </svg>
          </a>
        </CardHeader>
        <CardBody>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="90%"
            height="348px"
            viewBox="0 0 368.009 198.329"
          >
            <defs>
              <filter
                id="a"
                x="84.395"
                y="34.867"
                width="72.258"
                height="76.173"
                filterUnits="userSpaceOnUse"
              >
                <feOffset input="SourceAlpha" />
                <feGaussianBlur stdDeviation="2" result="b" />
                <feFlood floodColor="#fff" floodOpacity="0.475" />
                <feComposite operator="in" in2="b" />
                <feComposite in="SourceGraphic" />
              </filter>
              <filter
                id="c"
                x="141.591"
                y="5.205"
                width="135.474"
                height="92.044"
                filterUnits="userSpaceOnUse"
              >
                <feOffset input="SourceAlpha" />
                <feGaussianBlur stdDeviation="2" result="d" />
                <feFlood floodColor="#fff" floodOpacity="0.537" />
                <feComposite operator="in" in2="d" />
                <feComposite in="SourceGraphic" />
              </filter>
              <filter
                id="e"
                x="167.056"
                y="92.975"
                width="85.505"
                height="83.975"
                filterUnits="userSpaceOnUse"
              >
                <feOffset input="SourceAlpha" />
                <feGaussianBlur stdDeviation="2" result="f" />
                <feFlood floodColor="#fff" floodOpacity="0.537" />
                <feComposite operator="in" in2="f" />
                <feComposite in="SourceGraphic" />
              </filter>
              <filter
                id="g"
                x="79.735"
                y="106.407"
                width="102.22"
                height="78.862"
                filterUnits="userSpaceOnUse"
              >
                <feOffset input="SourceAlpha" />
                <feGaussianBlur stdDeviation="2" result="h" />
                <feFlood floodColor="#fff" floodOpacity="0.553" />
                <feComposite operator="in" in2="h" />
                <feComposite in="SourceGraphic" />
              </filter>
              <filter
                id="i"
                x="172.84"
                y="9.101"
                width="110.702"
                height="130.435"
                filterUnits="userSpaceOnUse"
              >
                <feOffset input="SourceAlpha" />
                <feGaussianBlur stdDeviation="2" result="j" />
                <feFlood floodColor="#fff" floodOpacity="0.569" />
                <feComposite operator="in" in2="j" />
                <feComposite in="SourceGraphic" />
              </filter>
              <filter
                id="k"
                x="74.794"
                y="92.182"
                width="75.343"
                height="88.006"
                filterUnits="userSpaceOnUse"
              >
                <feOffset input="SourceAlpha" />
                <feGaussianBlur stdDeviation="2" result="l" />
                <feFlood floodColor="#fff" floodOpacity="0.545" />
                <feComposite operator="in" in2="l" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g transform="translate(-42.991 -101.047)">
              <g transform="translate(191.956 138.117) rotate(-164)">
                <line
                  x2="36"
                  y2="14"
                  fill="none"
                  stroke="#707070"
                  strokeWidth="1"
                />
                <line
                  y1="13.475"
                  x2="47.849"
                  transform="translate(36 0.525)"
                  fill="none"
                  stroke="#707070"
                  strokeWidth="1"
                />
              </g>
              <g transform="matrix(0.891, -0.454, 0.454, 0.891, 71.5, 202.5)">
                <line
                  x2="33.858"
                  y2="17.252"
                  fill="none"
                  stroke="#707070"
                  strokeWidth="1"
                />
                <path
                  d="M0,0H28.983"
                  transform="matrix(0.995, 0.105, -0.105, 0.995, 33.317, 17.062)"
                  fill="none"
                  stroke="#707070"
                  strokeWidth="1"
                />
              </g>
              <g transform="translate(226.5 271.5)">
                <line
                  x2="36"
                  y2="14"
                  fill="none"
                  stroke="#707070"
                  strokeWidth="1"
                />
                <line
                  x2="43"
                  transform="translate(36 14)"
                  fill="none"
                  stroke="#707070"
                  strokeWidth="1"
                />
              </g>
              <g transform="translate(42.991 273.5)">
                <path
                  d="M30.327,24.163H89.837"
                  transform="translate(-30.327 -15.163)"
                  fill="none"
                  stroke="#707070"
                  strokeWidth="1"
                />
                <line
                  y1="9"
                  x2="22"
                  transform="translate(59.509)"
                  fill="none"
                  stroke="#707070"
                  strokeWidth="1"
                />
              </g>
              <g transform="matrix(0.999, -0.035, 0.035, 0.999, 129.5, 280.5)">
                <line
                  x2="30.423"
                  y2="17.072"
                  fill="none"
                  stroke="#707070"
                  strokeWidth="1"
                />
                <line
                  x2="51.968"
                  y2="1.815"
                  transform="translate(30.423 17.072)"
                  fill="none"
                  stroke="#707070"
                  strokeWidth="1"
                />
              </g>
              <g transform="translate(292.5 233.5)">
                <line
                  x2="36"
                  y2="14"
                  fill="none"
                  stroke="#707070"
                  strokeWidth="1"
                />
                <line
                  x2="72"
                  transform="translate(36 14)"
                  fill="none"
                  stroke="#707070"
                  strokeWidth="1"
                />
              </g>
              <g
                transform="translate(6.913 -20.555)"
                className="triangle-shapes"
              >
                <rect
                  width="198.428"
                  height="170.08"
                  transform="translate(116.416 131.181)"
                  fill="none"
                />
                <g
                  transform="matrix(1, 0, 0, 1, 36.08, 121.6)"
                  filter="url(#a)"
                  onClick={() => handleLayersAction("Recovery")}
                >
                  <path
                    d="M126.473,213.251l50.822-50.782,9.436,64.173Z"
                    transform="translate(-36.08 -121.6)"
                    fill={selectColor("Recovery")}
                  />
                </g>
                <a href="/admin/incidents">
                  <g
                    transform="matrix(1, 0, 0, 1, 36.08, 121.6)"
                    filter="url(#c)"
                    onClick={() => handleLayersAction("Defence")}
                  >
                    <path
                      d="M307.143,132.806,207.083,212.85l-23.414-54.013Z"
                      transform="translate(-36.08 -121.6)"
                      fill={selectColor("Defence")}
                    />
                  </g>
                </a>
                <a href="/admin/controls">
                  <g
                    transform="matrix(1, 0, 0, 1, 36.08, 121.6)"
                    filter="url(#e)"
                    onClick={() => handleLayersAction("Governance")}
                  >
                    <path
                      d="M282.639,260.667l-63.771,31.885-9.734-71.975Z"
                      transform="translate(-36.08 -121.6)"
                      fill={selectColor("Governance")}
                    />
                  </g>
                </a>
                <g
                  transform="matrix(1, 0, 0, 1, 36.08, 121.6)"
                  filter="url(#g)"
                  onClick={() => handleLayersAction("Risk Mitigation")}
                >
                  <path
                    d="M212.032,294.427l-90.22,6.443,66.868-66.862Z"
                    transform="translate(-36.08 -121.6)"
                    fill={selectColor("Risk Mitigation")}
                  />
                </g>
                <a href="/admin/Inventory">
                  <g
                    transform="matrix(1, 0, 0, 1, 36.08, 121.6)"
                    filter="url(#i)"
                    onClick={() => handleLayersAction("Asset Management")}
                  >
                    <path
                      d="M287.3,255.138l-72.382-39.479,98.7-78.956Z"
                      transform="translate(-36.08 -121.6)"
                      fill={selectColor("Asset Management")}
                    />
                  </g>
                </a>
                <g
                  transform="matrix(1, 0, 0, 1, 36.08, 121.6)"
                  filter="url(#k)"
                  onClick={() => handleLayersAction("Business Continuity")}
                >
                  <path
                    d="M180.214,232.452,116.871,295.79l6.334-76.006Z"
                    transform="translate(-36.08 -121.6)"
                    fill={selectColor("Business Continuity")}
                  />
                </g>

                {SixlayerData.SixLayersGraphData.map(
                  ({ Percent, valueLabel, Cat, id }) => (
                    <text
                      transform={valueLabel}
                      fill="#fff"
                      fontSize="9"
                      key={id}
                      fontFamily="sans-serif,HelveticaNeue, Helvetica Neue"
                      onClick={() => handleLayersAction(Cat)}
                    >
                      <tspan x="0" y="0">
                        {Percent}%
                      </tspan>
                    </text>
                  )
                )}
              </g>
              {SixlayerData.SixLayersGraphData.map(
                ({ Cat, labelTransform, id }) => (
                  <text
                    transform={labelTransform}
                    fill="#fff"
                    fontSize="7"
                    key={id}
                    fontFamily="sans-serif, Segoe UI, HelveticaNeue, Helvetica Neue"
                  >
                    <tspan x="0" y="0">
                      {Cat}
                    </tspan>
                  </text>
                )
              )}
            </g>
          </svg>
        </CardBody>
      </Card>
    </>
  );
}

export default Sixlayers;
