import React, { Suspense, useEffect, useState } from "react";
import { Route, useNavigate, Routes, Navigate, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../libs/state-management";
import "./App.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../libs/state-management/hooks";
import {fetchLocalization} from "../../../libs/state-management/localization/localization-slice";
import {
  RdsCompSideNavigation,
  RdsCompTopNavigation,
} from "../../rds-components";
// const menus = <Record<string, any>>require("../../../libs/main-menu");
import * as menus from "../../../libs/main-menu/index"

import { AuthGuard } from "../../../libs/public.api";
import RdsCompPageNotFound from "../../../../raaghu-components/src/rds-comp-page-not-found/rds-comp-page-not-found";
import { BlogsCompo, PaymentPlansCompo } from "./PageComponent";
const DashboardCompo = React.lazy(() => import("Dashboard/Dashboard"));
const LoginCompo = React.lazy(() => import("Login/Login"));
const ForgotPasswordCompo = React.lazy(
  () => import("ForgotPassword/ForgotPassword")
);
const TenantCompo = React.lazy(() => import("Tenant/Tenant"));
const EditionCompo = React.lazy(() => import("Edition/Edition"));
const SettingsCompo = React.lazy(() => import("Settings/Settings"));
const UsersCompo = React.lazy(() => import("Users/Users"));

const AuditlogsCompo = React.lazy(() => import("AuditLogs/AuditLogs"));
const RolesCompo = React.lazy(() => import("Roles/Roles"));
const OrganizationUnitsCompo = React.lazy(
  () => import("OrganizationUnits/OrganizationUnits")
);
const LanguageCompo = React.lazy(() => import("Language/Language"));
const LanguageTextCompo = React.lazy(() => import("LanguageText/LanguageText"));
const DynamicPropertyCompo = React.lazy(
  () => import("DynamicProperties/DynamicProperties")
);
const IconListCompo = React.lazy(() => import("IconList/IconList"));
const ClaimTypesCompo = React.lazy(() => import("ClaimTypes/ClaimTypes"));
const ApplicationsCompo = React.lazy(() => import("Applications/Applications"));
const TextTemplateCompo = React.lazy(() => import("TextTemplate/TextTemplate"));
const ApiScopeCompo = React.lazy(() => import("ApiScope/ApiScope"));
const ApiResourcesCompo = React.lazy(() => import("ApiResources/ApiResources"));

const ScopeCompo = React.lazy(() => import("Scope/Scope"));
const IdentityResourcesCompo = React.lazy(()=> import("IdentityResources/IdentityResources"));
const SecurityLogsCompo = React.lazy(() => import("SecurityLogs/SecurityLogs"));
const ChatsCompo = React.lazy(() => import("Chats/Chats"));
const FileManagementCompo = React.lazy(() => import("FileManagement/FileManagement"));
const FormsCompo = React.lazy(() => import("Forms/Forms"));
const FormsViewCompo = React.lazy(() => import("FormsView/FormsView"));
const FormsPreviewCompo = React.lazy(() => import("FormsPreview/FormsPreview"));
const BloggerCompo = React.lazy(() => import("Blogger/Blogger"));
const ClientCompo = React.lazy(() => import("Client/Client"));
const PollsCompo = React.lazy(()=> import("Polls/Polls"));
const UrlForwardingCompo = React.lazy(() => import("UrlForwarding/UrlForwarding"));
const CommentsCompo = React.lazy(() => import("Comments/Comments"));
const TagsCompo = React.lazy(() => import("Tags/Tags"));
const ElementsCompo = React.lazy(()=> import("Elements/Elements"));

export interface MainProps {
  toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
}

const Main = (props: MainProps) => {
  const [isAuth, setIsAuth] = useState<boolean>();
  const navigate = useNavigate();
  let accessToken: string | undefined | null =
    localStorage.getItem("access_token");
  let currentPath = window.location.pathname;
  console.log("This is the current path ",currentPath);

  const auth: any = useSelector(
    (state: RootState) => state.persistedReducer.login.isAuth
  );

  console.log("auth", isAuth);
  // const isLoggedIn = localStorage.getItem('access_token');
  const location = useLocation();

  useEffect(() => {
    const loginCredentials = localStorage.getItem("persist:root");
    if (loginCredentials != null) {
      let credentials = JSON.parse(loginCredentials);
      let parsedCredentials = JSON.parse(credentials.login);
      accessToken = parsedCredentials.accessToken;
    }

    // setIsAuth(true);
    if (localStorage.getItem("access_token")) {
      setIsAuth(true);
      if(currentPath !== '/dashobard' && currentPath != '/'){
        navigate(currentPath);
      }
      else{
        navigate('/dashboard');
      }
    }
    if (localStorage.getItem("access_token") == null) {
      navigate("/login");
    }
  }, [localStorage.getItem("access_token")]);

  // datas for changing language from dropdown on top-nav in dashboard

  const languageItems = [
    {
      label: "EN(US)",
      val: "en",
      icon: "us",
      iconWidth: "20px",
      iconHeight: "20px",
    },
    {
      label: "English(IND)",
      val: "en",
      icon: "in",
      iconWidth: "20px",
      iconHeight: "20px",
    },
    {
      label: "Français",
      val: "fr",
      icon: "fr",
      iconWidth: "20px",
      iconHeight: "20px",
    },
    {
      label: "Deutsch",
      val: "de",
      icon: "de",
      iconWidth: "20px",
      iconHeight: "20px",
    },
    {
      label: "Português (Brasil)",
      val: "pt-BR",
      icon: "br",
      iconWidth: "20px",
      iconHeight: "20px",
    },
    {
      label: "Türkçe",
      val: "tr",
      icon: "tr",
      iconWidth: "20px",
      iconHeight: "20px",
    },
    {
      label: "Italiano",
      val: "it",
      icon: "it",
      iconWidth: "20px",
      iconHeight: "20px",
    },
  ];
  const toggleItems = [
    {
      label: "Light",
      val: "light",
      icon: "sun",
      iconWidth: "20px",
      iconHeight: "20px",
    },
    {
      label: "Dark",
      val: "dark",
      icon: "moon",
      iconWidth: "17px",
      iconHeight: "17px",
    }
  ];

  // OnClickHandler for language change
  const objectArray = Object.entries(menus); 
   let newobjectArray=  objectArray.map((item)=>{
     return item[1]})
  const concatenated = newobjectArray.reduce((acc:any, arr:any) => acc.concat(arr), []);


  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const onClickHandler = (e: any) => {
    
    setCurrentLanguage(e.target.getAttribute("data-name"));    
  };
  const dispatch = useAppDispatch();
  const Data = useAppSelector((state:any) => state.persistedReducer.localization) as any;

  useEffect(() => {
    
    dispatch(fetchLocalization(currentLanguage) as any);
  }, [currentLanguage]);
  
  useEffect(()=>{
    
    console.log(Data.localization)
    i18n.changeLanguage(currentLanguage);
    var data1 = {};
    const translation= Data.localization.resources;
    if(translation){
        Object.keys(translation).forEach(key => {
          data1 = {...data1, ...translation[key].texts}
      })
      i18n.addResourceBundle(currentLanguage, 'translation', data1, false, true);
    }
   
  },[Data.localization])

  const sideNavItems = concatenated;
  
  // OnClickHandler for side nav to reflect title and subtitle on TopNav
  const getLabelForPath: any = (path: string, navItems: any) => {
    let label = null;
    for (const navItem of navItems) {
      if (navItem.path === path) {
        return navItem.label;
      }
      if (navItem.children) {
        label = getLabelForPath(path, navItem.children);
        if (label) {
          return label;
        }
      }
    }
    return label;
  };

  const getSubTitle: any = (label: string, navItems: any) => {
    let subTitle = null;
    for (const navItem of navItems) {
      if (navItem.label === label) {
        return navItem.subTitle;
      }
      if (navItem.children) {
        subTitle = getSubTitle(label, navItem.children);
        if (subTitle) {
          return subTitle;
        }
      }
    }
    return subTitle;
  };

  const displayName = getLabelForPath(currentPath, sideNavItems);
  const subTitle = getSubTitle(displayName, sideNavItems);
  const [currentTitle, setCurrentTitle] = useState(displayName);
  const [currentSubTitle, setCurrentSubTitle] = useState(subTitle);

  const sideNavOnClickHandler = (e: any) => {
    const subTitle = getSubTitle(
      e.target.getAttribute("data-name"),
      sideNavItems
    );
    setCurrentSubTitle(subTitle);
    setCurrentTitle(e.target.getAttribute("data-name"));
  };

  const logout = () => {
    localStorage.clear();
    setIsAuth(false);
    navigate("/login");
  };
  let logo = "./assets/raaghu_logs.png";
  return (
    <Suspense>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthGuard>
              <LoginCompo />
            </AuthGuard>
          }
        ></Route>
        <Route
          path="/forgot-password"
          element={<ForgotPasswordCompo />}
        ></Route>
      </Routes>
      {/* {auth && isAuth && (        have to implement this one we get started with service proxy for abp        */}
      {isAuth && (
        <div className="d-flex flex-column flex-root">
          <div className="page d-flex flex-column flex-column-fluid">
            <div className="header align-items-stretch">
              <RdsCompTopNavigation
                languageItems={languageItems}
                toggleItems={toggleItems}
                // brandName="raaghu"
                onClick={onClickHandler}
                profileTitle="Host Admin"
                profileName="admin"
                onLogout={logout}
                logo={logo}
                toggleTheme={props.toggleTheme}
                navbarTitle={t(currentTitle) || ""}
                navbarSubTitle={t(currentSubTitle) || ""}
                onChatClickHandler={()=>{console.log("Hey Chat Button Clicked!!")}}
              />
            </div>
            <div
              className="
							page
        d-flex
        flex-column-fluid
        align-items-stretch
        container-fluid
        px-0"
            >
              <div className="d-flex flex-column-fluid align-items-stretch container-fluid px-0 main-body">
                <div className="aside ng-tns-c99-0" id="aside">
                  <div className="mx-2 pt-2">
                    <RdsCompSideNavigation
                      sideNavItems={sideNavItems}
                      onClick={sideNavOnClickHandler}
                      toggleTheme={props.toggleTheme}
                    ></RdsCompSideNavigation>
                  </div>
                </div>
                <div
                  className="wrapper d-flex flex-column flex-row-fluid rds-scrollable-wrapper pt-3 px-sm-0 px-lg-3 "
                  id="FixedHeaderOverFlow"
                >
                  <Suspense>
                  <Routes>
                    <Route
                      path="/dashboard"
                      element={<DashboardCompo />}
                    ></Route>
                      <Route
                      path="/raaghuUi"
                      element={<DashboardCompo />}
                    ></Route>
                    <Route
                      path="/tenant"
                      element={<TenantCompo></TenantCompo>}
                    ></Route>
                    <Route
                      path="/edition"
                      element={<EditionCompo></EditionCompo>}
                    ></Route>
                    <Route
                      path="/settings"
                      element={<SettingsCompo></SettingsCompo>}
                    ></Route>
                    <Route
                      path="/audit-logs"
                      element={<AuditlogsCompo></AuditlogsCompo>}
                    ></Route>
                    <Route path="/users" element={<UsersCompo />}></Route>
                    <Route
                      path="/role"
                      element={<RolesCompo></RolesCompo>}
                    ></Route>
                    <Route
                      path="/organization-unit"
                      element={
                        <OrganizationUnitsCompo></OrganizationUnitsCompo>
                      }
                    ></Route>
                    <Route
                      path="/language"
                      element={<LanguageCompo></LanguageCompo>}
                    ></Route>
                    <Route
                      path="/language-text"
                      element={<LanguageTextCompo></LanguageTextCompo>}
                    ></Route>
                    <Route
                      path="/dynamic-properties"
                      element={<DynamicPropertyCompo></DynamicPropertyCompo>}
                    ></Route>
                    <Route
                      path="/security-logs"
                      element={<SecurityLogsCompo />}
                    ></Route>

                    <Route path="/icons" element={<IconListCompo />}></Route>
                    <Route path="/claim-types" element={<ClaimTypesCompo />} />
                    <Route
                      path="/text-template"
                      element={<TextTemplateCompo />}
                    ></Route>
                    <Route
                      path="/applications"
                      element={<ApplicationsCompo />}
                    ></Route>
                    <Route
                      path="/scope"
                      element={<ScopeCompo />}
                    ></Route>
                    <Route path="/identityResources"
                    element ={<IdentityResourcesCompo/>}
                    />

                    <Route path="/api-scope" element={<ApiScopeCompo />} />
                    <Route path="/apiResources" element={<ApiResourcesCompo />} />
                    <Route path="/blogs" element={<BlogsCompo />} />
                    <Route path="/chats" element={<ChatsCompo />} />
                    
                    <Route path="/fileManagement" element={<FileManagementCompo />} />
                    <Route path="/forms" element={<FormsCompo />} />
                    <Route path="/formsView/:id" element={<FormsViewCompo />} />
                    <Route  path="/formsPreview/:id" element={<FormsPreviewCompo />} />
                    <Route path="/polls" element={<PollsCompo />} />
                    

                    <Route path="/blogger" element={<BloggerCompo />} />
                    <Route path="/client" element={<ClientCompo />} />
                    <Route path="/url-forwarding" element={<UrlForwardingCompo />} />
                    <Route path="/paymentPlans" element={<PaymentPlansCompo />} />
                    <Route path="/comments" element={<CommentsCompo />} />
                    <Route path="/tags" element={<TagsCompo />} />
                    <Route path="/elements" element={<ElementsCompo />} />
                    <Route path="/**/*" element={<RdsCompPageNotFound />} />
                  </Routes>
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
};
export default Main;