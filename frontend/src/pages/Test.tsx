import * as React from "react";

interface LanguageSwitcherProps {
  languages: string[];
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ languages }) => {
  return (
    <div className="flex gap-3.5 my-auto text-sm leading-5 text-center text-sky-700">
      {languages.map((language, index) => (
        <React.Fragment key={index}>
          <div>{language}</div>
          {index !== languages.length - 1 && (
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc969be40d09ce95c83349369d49158455084a8da6713300e20c62a50c884cd4?apiKey=583ccd9ec6b5459f93bca7ccb81f8b43&"
              alt="Language separator"
              className="shrink-0 self-start w-3.5 aspect-square"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

interface SignInOptionProps {
  imageSrc: string;
  altText: string;
  label: string;
}

const SignInOption: React.FC<SignInOptionProps> = ({
  imageSrc,
  altText,
  label,
}) => {
  return (
    <div className="flex flex-col">
      <img
        loading="lazy"
        src={imageSrc}
        alt={altText}
        className="self-center w-12 border border-solid aspect-square border-slate-600 border-opacity-10"
      />
      <div className="mt-3.5">{label}</div>
    </div>
  );
};

const Test: React.FC = () => {
  const languages = ["English"];
  const signInOptions = [
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/997b201be21260232257d882bff427bccbeac11c53354b69178fed15f8d4a026?apiKey=583ccd9ec6b5459f93bca7ccb81f8b43&",
      altText: "SSO sign-in option",
      label: "SSO",
    },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/495ce15c74eeeaaff8a4a27dcdae2f768575178e4510e9b12a56dfbba40d0e0f?apiKey=583ccd9ec6b5459f93bca7ccb81f8b43&",
      altText: "Apple sign-in option",
      label: "Apple",
    },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/a12415203f5a14512c85f7ff850dbbf99dbcfa7f2ec84477f6bfce34c39b412d?apiKey=583ccd9ec6b5459f93bca7ccb81f8b43&",
      altText: "Google sign-in option",
      label: "Google",
    },
    {
      imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/2f30e8e0cf9070621db4fcf86d0a7c0260565910d170ab504a0924087a822850?apiKey=583ccd9ec6b5459f93bca7ccb81f8b43&",
      altText: "Facebook sign-in option",
      label: "Facebook",
    },
  ];

  return (
    <div className="flex flex-col justify-center">
      <header className="flex gap-5 justify-between pt-2 pr-12 pb-3.5 pl-1.5 w-full tracking-wide whitespace-nowrap bg-white border-b border-gray-200 border-solid max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <div className="flex flex-col">
          <div className="text-sm leading-5 text-white">Accessibility</div>
          <h1 className="mt-2 text-4xl font-bold leading-6 text-center text-indigo-600 backdrop-blur-[2px]">
            EyeCue
          </h1>
        </div>
        <LanguageSwitcher languages={languages} />
      </header>
      <main className="flex z-10 flex-col py-20 -mt-1 w-full max-md:max-w-full">
        <div className="mt-4 w-full max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-center items-start px-16 py-6 mt-20 w-full bg-slate-50 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <div className="flex overflow-hidden relative flex-col items-start px-8 pt-8 pb-20 ml-5 max-w-full min-h-[444px] w-[554px] max-md:px-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/43e47ee283b43249531197bcee5b2f1ec3ccb68b77144d39d5e93eb51c07d611?apiKey=583ccd9ec6b5459f93bca7ccb81f8b43&"
                    alt="Background"
                    className="object-cover absolute inset-0 size-full"
                  />
                  <div className="relative shrink-0 mb-60 bg-blue-400 h-[18px] w-[65px] max-md:mb-10" />
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col px-5 text-sm tracking-wide max-md:mt-10 max-md:max-w-full">
                <h2 className="self-center text-3xl leading-10 text-center capitalize text-neutral-900">
                  Sign In
                </h2>
                <form>
                  <label htmlFor="email" className="sr-only">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    className="justify-center items-start px-3 py-5 mt-9 text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-500 border-solid max-md:pr-5 max-md:max-w-full"
                  />
                  <div className="flex gap-5 justify-between py-4 pr-20 pl-4 mt-6 text-base leading-6 text-gray-500 whitespace-nowrap bg-white rounded-lg border border-gray-500 border-solid max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className="flex-1"
                    />
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/47b8ea720022b244e50add29239cf26e088babebe86ea7375526637f8a967961?apiKey=583ccd9ec6b5459f93bca7ccb81f8b43&"
                      alt="Password visibility toggle"
                      className="shrink-0 self-start w-3.5 aspect-square"
                    />
                  </div>
                  <div className="flex gap-5 justify-between mt-8 w-full text-center text-sky-700 leading-[143%] max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                    <a href="#" className="text-sky-700">
                      Forgot password?
                    </a>
                    <div className="flex gap-3 whitespace-nowrap">
                      <div>Help</div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/307bed98e6f27b29dcd83442f5bd46673a52fbdb1250950f6b4bf2abd1284e6f?apiKey=583ccd9ec6b5459f93bca7ccb81f8b43&"
                        alt="Help icon"
                        className="shrink-0 self-start w-3.5 aspect-square"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="justify-center items-center px-16 py-3.5 mt-4 text-base tracking-wide leading-6 text-center text-white bg-blue-600 rounded-xl max-md:px-5 max-md:max-w-full"
                  >
                    Sign In
                  </button>
                </form>
                <div className="flex gap-0 mt-5 max-md:flex-wrap">
                  <div className="flex flex-col">
                    <div className="text-gray-500 leading-[143%]">
                      By signing in, I agree to the{" "}
                    </div>
                    <div className="flex gap-4 mt-2 text-sky-700">
                      <div className="leading-[143%]">Statement</div>
                      <div className="flex-auto leading-5">
                        {" "}
                        and{" "}
                        <a href="#" className="text-sky-700">
                          Terms of Service
                        </a>
                        .
                      </div>
                    </div>
                  </div>
                  <a href="#" className="flex-auto self-start text-sky-700 leading-[143%]">
                    EyeCue's Privacy
                  </a>
                </div>
                <div className="flex gap-5 self-start mt-8 text-gray-500 leading-[143%] max-md:pr-5">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="staySignedIn"
                      className="shrink-0 w-4 h-4 bg-gray-100 rounded border border-solid border-neutral-300"
                    />
                    <label htmlFor="staySignedIn">Stay signed in</label>
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/53daf0058231833dfc2e774f75232eedd39c7c4d27987c82267b15f82849d08b?apiKey=583ccd9ec6b5459f93bca7ccb81f8b43&"
                    alt="Stay signed in info"
                    className="shrink-0 self-start w-3.5 aspect-square"
                  />
                </div>
                <div className="justify-center self-center px-6 py-1.5 mt-9 text-center text-gray-500 bg-white leading-[171%] max-md:px-5">
                  Or sign in with
                </div>
                <div className="flex gap-5 mt-6 text-center whitespace-nowrap leading-[271%] text-gray-950 text-opacity-60 max-md:pr-5 max-md:mx-0.5">
                  {signInOptions.map((option, index) => (
                    <SignInOption key={index} {...option} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="self-end mt-7 mr-16 mb-2 text-sm tracking-wide leading-5 text-sky-700 max-md:mr-2.5 max-md:max-w-full">
          EyeCue is protected by reCAPTCHA and the Google{" "}
          <a href="#" className="text-sky-700">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-sky-700">
            Terms of Service
          </a>{" "}
          apply.
        </footer>
      </main>
    </div>
  );
};

export default Test;