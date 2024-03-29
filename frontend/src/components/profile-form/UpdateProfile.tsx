import { useState, FC, JSX } from "react";
import Alert from "../layout/Alert";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../config/GlobalStateConfig";
import {
  ProfileCreationForm,
  createUpdateProfileAsync,
} from "../../reducers/profile";

const UpdateProfile: FC = (): JSX.Element => {
  let value = "";
  const profile = useAppSelector((state) => state.profile.profile);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<ProfileCreationForm>({
    company: profile?.company ? profile?.company : "",
    website: profile?.website ? profile?.website : "",
    location: profile?.location ? profile?.location : "",
    bio: profile?.bio ? profile?.bio : "",
    status: profile?.status ? profile?.status : "",
    githubusername: profile?.githubusername ? profile?.githubusername : "",
    skills: profile?.skills ? profile?.skills.toString() : "",
    facebook: profile?.social?.facebook ? profile?.social?.facebook : "",
    youtube: profile?.social?.youtube ? profile?.social?.youtube : "",
    twitter: profile?.social?.twitter ? profile?.social?.twitter : "",
    instagram: profile?.social?.instagram ? profile?.social?.instagram : "",
    linkedin: profile?.social?.linkedin ? profile?.social?.linkedin : "",
  });
  let navigate = useNavigate();
  const [showSocialInputs, setShowSocialInputs] = useState<boolean>(false);
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    facebook,
    youtube,
    twitter,
    instagram,
    linkedin,
  } = formData;
  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    value =
      (e.target.name === "website" ||
        e.target.name === "facebook" ||
        e.target.name === "youtube" ||
        e.target.name === "twitter" ||
        e.target.name === "instagram" ||
        e.target.name === "linkedin") &&
      !e.target.value.startsWith("https://")
        ? "https://" + e.target.value
        : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };
  return (
    <div className="container">
      <Alert />
      <section>
        <h1 className="large text-primary">Edit Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to make
          your profile stand out
        </p>
        <small>* = required field</small>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(
              createUpdateProfileAsync({
                profileData: formData,
                navigate,
                edit: true,
              })
            );
          }}>
          <div className="form-group">
            <select name="status" value={status} onChange={(e) => onChange(e)}>
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Company"
              name="company"
              value={company}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Could be your own company or one you work for
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Website"
              name="website"
              value={website}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Could be your own or a company website
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Skills"
              name="skills"
              value={skills}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              name="githubusername"
              value={githubusername}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              value={bio}
              onChange={(e) => onChange(e)}></textarea>
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="my-2">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setShowSocialInputs(!showSocialInputs)}>
              {showSocialInputs
                ? "Hide Social Network Links"
                : "Add Social Network Links"}
            </button>
            <span>Optional</span>
          </div>
          {showSocialInputs && (
            <>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input
                  type="text"
                  placeholder="Twitter URL"
                  name="twitter"
                  value={twitter}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input
                  type="text"
                  placeholder="Facebook URL"
                  name="facebook"
                  value={facebook}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input
                  type="text"
                  placeholder="YouTube URL"
                  name="youtube"
                  value={youtube}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input
                  type="text"
                  placeholder="Linkedin URL"
                  name="linkedin"
                  value={linkedin}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                  value={instagram}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </>
          )}
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </section>
    </div>
  );
};

export default UpdateProfile;
