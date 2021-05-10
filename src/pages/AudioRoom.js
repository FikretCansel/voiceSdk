import React from "react";
import {
  join,
  leave,
  getUsers,
  getClient,
  getVolumes
} from "../agora/basicVideoCall";
import Profile from "../components/Profile";

export default function AudioRoom({ name }) {
  const [users, setUsers] = React.useState([]);
  const [isTalking, setIsTalking] = React.useState(false);
  const [isStarted, setIsStarted] = React.useState(false);
  const start = () => {
    join();
    setIsStarted(true);
  };
  const finish = () => {
    leave();
    setIsStarted(false);
  };
  React.useEffect(() => {
    const timer = setInterval(() => {
      const volumes = getVolumes();
      const myVolume = volumes[getClient().uid];
      setIsTalking(myVolume > 2);
      setUsers([...getUsers()]);
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <h2>{name}</h2>
      {!isStarted ? (
        <button onClick={start}>goygoya başla!</button>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 8
            }}
          >
            <Profile name="" isTalking={isTalking} />
          </div>
          <button style={{ marginBottom: 32 }} onClick={finish}>
            terket
          </button>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
              textAlign: "center",
              justifyContent: "center",
              alignContent: "center"
            }}
          >
            {users.map((u) => (
              <Profile
                key={u.uid}
                name={u.uid}
                isTalking={getVolumes()[u.uid] > 2}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
