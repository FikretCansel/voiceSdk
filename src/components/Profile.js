import React from "react";

export default function Profile({ name, isTalking }) {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          borderWidth: 2,
          borderColor: isTalking ? "blue" : "transparent",
          borderStyle: "solid",
          borderRadius: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            borderRadius: "100%",
            margin: 4,
            backgroundColor: "#32a86d",
            width: 48,
            height: 48
          }}
        />
        <span style={{ fontSize: 8 }}>{name}</span>
      </div>
    </div>
  );
}
