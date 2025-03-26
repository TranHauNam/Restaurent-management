import * as React from "react";

function MyComponent() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Segoe+UI:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div style={styles.div}>
        <div style={styles.div2}>
          <div style={styles.div3}>
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    '<svg id="1063:2505" layer-name="mdi:chevron-down" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px] transform-[rotate(90deg)] text-[#F49B33]"> <path d="M13 5.41L8.66981 10L13 14.59L11.6604 16L6 10L11.6604 4L13 5.41Z" fill="#F49B33"></path> </svg>',
                }}
              />
            </div>
            <div style={styles.div4}>
              <div style={styles.div5}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/bf1afaf76ccf72c8401a6b9f07ad3c4b4d3a3273"
                  alt="Dine Logo"
                  style={styles.rawImg}
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/92fad5acc1ed444243b1efbd05d2d04fb1ccc19b"
                  alt=""
                  style={styles.rawImg}
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b6fd017be2acf6080e18766c111ba3adaa4676ce"
                  alt=""
                  style={styles.rawImg}
                />
                <div style={styles.div6}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f"
                    alt=""
                    style={styles.rawImg}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={styles.div7}>
          <div style={styles.div8}>Let's get you started</div>
          <div style={styles.div9}>
            <div style={styles.div10}>
              <div style={styles.div11}>Email address</div>
              <div style={styles.div12}>
                <input
                  type="email"
                  placeholder="bobsmith@gmail.com"
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.div13}>
              <div style={styles.div14}>Full name</div>
              <div style={styles.div15}>
                <input
                  type="text"
                  placeholder="Bob Smith"
                  style={styles.input}
                />
              </div>
            </div>
            <button style={styles.button}>Send One Time Password</button>
            <div style={styles.div16}>
              <span style={styles.span}>Already a user?</span>
              <a href="#" style={styles.a}>
                Sign in
              </a>
            </div>
          </div>
        </div>
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                '<svg id="601:727" layer-name="Frame" width="375" height="83" viewBox="0 0 375 83" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-[83px] mt-auto opacity-[0.1]"> <g opacity="0.1" clip-path="url(#clip0_601_727)"> <g opacity="0.9"> <path d="M41.822 52.3974C47.6662 52.3974 53.3249 47.7607 55.6393 28.5696H28.0048C29.8972 47.2079 35.9825 52.3974 41.8267 52.3974H41.822Z" fill="#F49B33"></path> </g> </g> </svg>',
            }}
          />
        </div>
      </div>
    </>
  );
}

const styles = {
  div: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#fff",
    width: "100%",
  },
  div2: {
    position: "relative",
    width: "100%",
  },
  div3: {
    display: "flex",
    alignItems: "center",
    padding: "16px 32px",
  },
  div4: {
    margin: "0 auto",
  },
  div5: {
    width: "144px",
    position: "relative",
  },
  div6: {
    position: "absolute",
    left: "0px",
    top: "3px",
    width: "14px",
    height: "68px",
  },
  div7: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    padding: "0 32px",
  },
  div8: {
    color: "#2b2b2b",
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: "36px",
    margin: "60px 0 30px",
  },
  div9: {
    width: "100%",
    maxWidth: "311px",
  },
  div10: {
    marginBottom: "20px",
  },
  div11: {
    color: "#5e5e5e",
    fontSize: "14px",
    lineHeight: "20px",
    marginBottom: "8px",
  },
  div12: {
    position: "relative",
  },
  input: {
    width: "100%",
    height: "40px",
    borderRadius: "4px",
    borderWidth: "0.7px",
    borderColor: "#5e5e5e",
    fontSize: "12px",
    color: "#cecece",
    padding: "0 16px",
  },
  div13: {
    marginBottom: "30px",
  },
  div14: {
    color: "#5e5e5e",
    fontSize: "14px",
    lineHeight: "20px",
    marginBottom: "8px",
  },
  div15: {
    position: "relative",
  },
  button: {
    width: "100%",
    backgroundColor: "#f49b33",
    color: "#fff",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "24px",
    borderRadius: "4px",
    marginBottom: "20px",
    padding: "8px 0",
  },
  div16: {
    display: "flex",
    justifyContent: "center",
    gap: "13px",
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 700,
  },
  span: {
    color: "#5e5e5e",
  },
  a: {
    color: "#f49b33",
    textDecoration: "underline",
  },
  rawImg: {
    width: "100%",
    height: "auto",
  },
};

export default MyComponent;