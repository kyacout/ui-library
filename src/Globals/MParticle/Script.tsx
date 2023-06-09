/* eslint-disable react/no-danger */
import { PlanID, PlanVersion } from '@uiLibrary/data-plans/lib/uiLibrary_ecom'
import getConfig from 'next/config'
import React from 'react'

const { publicRuntimeConfig } = getConfig()

const dataPlanID: PlanID = 'uiLibrary_ecom'
const dataPlanVersion: PlanVersion = 1

const content = `
  window.mParticle = {
    config: {
      isDevelopmentMode: ${publicRuntimeConfig.mParticleIsDev !== 'true' ? 'false' : 'true'},
      dataPlan: {
        planId: '${dataPlanID}',
        planVersion: ${dataPlanVersion}
      }
    }
  };

  (function(t){
    window.mParticle=window.mParticle||{};
    window.mParticle.EventType={
      Unknown:0,
      Navigation:1,
      Location:2,
      Search:3,
      Transaction:4,
      UserContent:5,
      UserPreference:6,
      Social:7,
      Other:8
    };
    window.mParticle.eCommerce={Cart:{}};
    window.mParticle.Identity={};
    window.mParticle.config=window.mParticle.config||{};
    window.mParticle.config.rq=[];
    window.mParticle.config.snippetVersion=2.2;
    window.mParticle.ready=function(t){window.mParticle.config.rq.push(t)};
    var e=[
      "endSession","logError","logBaseEvent","logEvent",
      "logForm","logLink","logPageView","setSessionAttribute",
      "setAppName","setAppVersion","setOptOut","setPosition",
      "startNewSession","startTrackingLocation","stopTrackingLocation"
    ];
    var o=["setCurrencyCode","logCheckout"];
    var i=["identify","login","logout","modify"];
    function n(e,o){
      return function(){
        if(o){e=o+"."+e}
        var t=Array.prototype.slice.call(arguments);
        t.unshift(e);
        window.mParticle.config.rq.push(t);
      };
    };
    e.forEach(function(t){window.mParticle[t]=n(t)});
    o.forEach(function(t){window.mParticle.eCommerce[t]=n(t,"eCommerce")});
    i.forEach(function(t){window.mParticle.Identity[t]=n(t,"Identity")});
    var mp=document.createElement("script");
    mp.type="text/javascript";
    mp.async=true;
    mp.src="https://jssdkcdns.mparticle.com/js/v2/"+t+"/mparticle.js";
    var c=document.getElementsByTagName("script")[0];
    c.parentNode.insertBefore(mp,c);
  })("${publicRuntimeConfig.mParticleAPIKey}");
`

export const MParticleScript = () => (
  <script
    key="mparticle-bootstrap"
    dangerouslySetInnerHTML={{ __html: content }}
    type="text/javascript"
  />
)
