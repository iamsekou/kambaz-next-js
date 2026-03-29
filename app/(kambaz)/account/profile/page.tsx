"use client";

import * as client from "../client";
import { RootState } from "../../store";
import { setCurrentUser } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    if (currentUser) {
      setProfile(currentUser);
    }
  }, [currentUser]);

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    router.push("/account/signin");
  };

  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl
            className="mb-2"
            value={profile.username || ""}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
            placeholder="username"
          />
          <FormControl
            className="mb-2"
            value={profile.password || ""}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
            placeholder="password"
            type="password"
          />
          <FormControl
            className="mb-2"
            value={profile.firstName || ""}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
            placeholder="first name"
          />
          <FormControl
            className="mb-2"
            value={profile.lastName || ""}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
            placeholder="last name"
          />
          <FormControl
            className="mb-2"
            value={profile.email || ""}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
            placeholder="email"
          />

          <Button onClick={updateProfile} className="w-100 mb-2">
            Update
          </Button>

          <Button onClick={signout} className="w-100 btn-danger">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}