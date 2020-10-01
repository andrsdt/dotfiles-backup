function _parent(e)
{
	if (e && e.parentNode)
		return e.parentNode;
	
	return false;
}

function _id(s)
{
	return document.getElementById(s);
}

function _sl(s, c)
{
	return (c || document).querySelector(s);
}

function _ev(s, c)
{
	return document.evaluate("//"+s, c || document, null, XPathResult.ANY_TYPE, null).iterateNext();
}


function getE(h)
{
	switch (h)
	{
		case 'sp-prod.net': return _sl('.cmp-cta-accept, .message-button:not(.cmp-cta-accept) + .message-button');
		case 'privacymanager.io': return _sl('.noDenyButton .accept-all');
		
		case 'o2.pl':
		case 'money.pl':
		case 'open.fm':
		case 'gadzetomania.pl':
		case 'kafeteria.pl':
		case 'dobreprogramy.pl':
		case 'fotoblogia.pl':
		case 'pudelek.pl':
		case 'komorkomania.pl':
		case 'autokult.pl':
		case 'abczdrowie.pl':
		case 'parenting.pl':
		case 'so-magazyn.pl':
		case 'domodi.pl':
			return _ev("button[contains(., 'PRZECHODZ')]");
		
		case 'video.gazzanet.gazzetta.it':
		case 'video.corriere.it':
			var e = _id('_cpmt-iframe');
			if (e) window.scrollTo(0, 1000);
			return e;
		
		case 'octapharma.com':
			var e = _sl('#assistant-paper button');
			return (e && _ev("span[contains(., 'I agree')]", e) ? e : false);
		
		case 'rp.pl':
		case 'parkiet.com':
			return _sl('#rodo-popup button:last-child');
		
		case 'blick.ch':
			var e = _sl('div[id^="sp_message"][class^="sp_message_container"]:not(.idcac)');
			if (e) e.className += " idcac";
			return e;
		
		case 'centrumtenisa.pl':
			var e = _sl('.modal .policy');
			return (e ? _sl('.modal .close') : false);
		
		case 'wacom.com':
			var e = _sl('#consent_blackbar:not(.idcac)');
			if (e) e.className += " idcac";
			return e;
		
		case 'deezer.com':
			var e = _sl('#modal-gdpr:not(.idcac)');
			if (e) e.className += " idcac";
			return e;
		
		case 'lomax.dk':
			var e = _sl('#cookieModal:not(.idcac)');
			if (e) e.className += " idcac";
			return e;
		
		case 'motocombo.pl':
			var e = _sl('#topInfoContainer0:not(.idcac)');
			if (e) e.className += " idcac";
			return e;
		
		case 'wp.pl':
			document.cookie = 'WP-cookie-info=1'; // wiadomosci
			return _ev("button[contains(., 'PRZECHODZ')]");
		
		case 'blikopzeewolde.nl':
		case 'socialmediaacademie.nl':
		case 'petsie.nl':
			return _sl('.jBlockerAccept');
		
		case 'fifa.com':
			// The first rule is for predictor.fifa.com
			var e = _sl('#root > div > div > svg');
			if (e) e.dispatchEvent(new Event("click", {bubbles:true}));
			return (e ? e : _sl('.mdl-overlay .close'));
		
		case 'tallsay.com':
		case 'plazilla.com':
			return _sl('.buttonblue[name="cookieok"]');
		
		case 'interspar.at':
		case 'spar.at':
			return _sl('.has-cookie-notification .cookie-notification__confirm');
		
		case 'spar.hu':
		case 'spar.hr':
			return _sl('.has-cookie-notification .cookie-notification__accept');
			
		case 'spar.si':
			return _sl('.has-cookie-notification .cookie-notification__accept, .cookie-notification__select-all');
		
		case 'rain-alarm.com':
			var e = _id('privacypolicyAnalyticsYes');
			if (e) e.click();
			return _id('dialogButtonNo');
		
		case 'medium.com':
		case 'blog.cyclofix.com':
		case 'uxplanet.org':
		case 'blog.trezor.io':
		case 'blog.getadblock.com':
		case 'tech.busuu.com':
		case 'blog.cosmos.network':
		case 'netflixtechblog.com':
		case 'instagram-engineering.com':
		case 'cm.engineering':
		case 'uxdesign.cc':
		case 'itnext.io':
		case 'codeburst.io':
		case 'iopipe.com':
		case 'justaword.fr':
		case 'ferdychristant.com':
		case 'towardsdatascience.com':
		case 'blog.apify.com':
		case 'blog.usejournal.com':
		case 'heartbeat.fritz.ai':
		case 'broadcast.listennotes.com':
		case 'xato.net':
		case 'mondaynote.com':
		case 'fueradeseries.com':
			var e = _sl('body > div:not([id]):not([class]) > div > div .branch-journeys-top a[href*="policy"]');
			return (e ? _sl('button', e.parentNode.nextSibling) : false);
		
		case 'watchadvisor.com':
			var e = _sl('#wa-base-gdpr-consent-form #edit-consent-cookies');
			if (e) e.click();
			return _sl('#wa-base-gdpr-consent-form #edit-submit');
		
		case 'fok.nl':
			var e = _sl('#cookieholder .cookiesButton');
			if (e && !/idcac/.test(e.className)) {e.className += " idcac"; e.click()};
			return _sl('body > div[class^="app"] > div[class^="popup"] .primary');
		
		case 'biorender.com':
			var e = _sl('#___gatsby > div > div > div > div > div > div > div > a[href*="/privacy"]');
			return (e ? e.parentNode.nextSibling.firstChild : false);
		
		case 'puzzleyou.be':
		case 'fotondo.cz':
			return _id('cookies-consent-accept-all');
		
		case 'match.com':
			var e = _parent(_sl('a[data-cookie-no-optin][href*="cookie"]'));
			return (e ? e.nextSibling : false);
		
		case 'jetbluevacations.com':
			var e = _sl('.cdk-overlay-container a[href*="/legal/privacy"]');
			return (e ? _sl('.cdk-overlay-container button[mat-dialog-close]') : false);
		
		case 'neu.de':
			var e = _parent(_sl('.js-cookie-no-optin'));
			return (e ? e.nextSibling : false);
		
		case 'kringloopapp.nl':
			var e = _ev("h4[contains(., 'Cookies')]");
			return (e ? _id('modal-close') : false);
		
		case 'marokko.nl':
			var e = _sl('.cookiealert .button');
			if (e) e.dispatchEvent(new Event("mousedown"));
			return false;
		
		case 'totum.com':
			var e = _sl('.modal.active a[href*="cookie-policy"]');
			return (e ? _sl('a', e.parentNode.nextSibling) : false);
		
		case 'plt.nl':
		case 'amphion.nl':
			return _sl('.site-image .accept');
		
		case 'intersport.hr':
		case 'intersport.si':
		case 'intersport.rs':
			return _sl('.gdpr-modal-wrapper._show .primary.button');
		
		case 'thelily.com':
			var e = _sl('.gdpr-wall[style] .agree-checkmark');
			if (e) e.click();
			return _sl('.gdpr-wall[style] .continue-btn');
		
		case 'rocrivor.nl':
			var e = _id('id_third_party_cookies_0');
			if (e) e.click();
			return _sl('.fancybox-is-open #cookiewall .button--blue');
		
		case 'maps.arcgis.com': // s-leipzig
			var e = _sl('.jimu-widget-splash .jimu-checkbox');
			if (e) e.click();
			return _sl('.jimu-widget-splash .jimu-btn');
		
		case 'nederpix.nl':
		case 'birdpix.nl':
			return _sl('#cookieSettings[style*="block"] #cookieAccept');
		
		case 'track-trace.com':
		case 'pakkesporing.no':
		case 'forstasidorna.se':
		case 'forsidene.no':
			return _sl('.tingle-modal--visible .tingle-btn--primary');
		
		case 'portalsamorzadowy.pl':
		case 'infodent24.pl':
		case 'portalspozywczy.pl':
		case 'promocjada.pl':
			return _sl('.rodo.open .button');
		
		case 'shootingtimes.com':
		case 'gunsandammo.com':
			return _sl('.lity-opened #consent .lity-close');
		
		case 'wko.at':
		case 'gruenderservice.at':
			return _sl('#cookiehint .cookieagree');
		
		case 'cideon.de':
		case 'eplan.blog':
			return _sl('.m-content-cideon-cookie-consent__accept');
		
		case 'makro.nl':
		case 'metro.hu':
		case 'metro.fr':
			return _sl('.modal.in #cookieLawAgreeBtn');
		
		case 'gry.pl':
		case 'a10.com':
			return _sl('div[class^="app_gdpr"] div[class^="popup"][style*="flex"] button[class*="intro_acceptAll"]'); // e
		
		case 'merckmanual.nl':
		case 'msdmanuals.nl':
			return _sl('.cookies + form .button');
		
		case 'steviaproducts.be':
		case 'pcdiscounter.eu':
		case 'shop4mama.nl':
			return _sl('.ui-dialog[style*="block"] #OneTimePopupDialog + .ui-dialog-buttonpane button:last-child');
		
		case 'welcomemrbaby.com':
			var e = _sl('.mfp-ready .dont-show-me');
			if (e) e.click();
			return _sl(".mfp-ready .dont-show-label ~ a");
		
		case 'moderne-landwirtschaft.de':
		case 'thule.com':
			return _sl('#cookieModal.in .btn');
		
		case 'transip.nl':
		case 'transip.eu':
		case 'cloudvps.nl':
			return _sl("#consent-modal .one-btn, .consent-popup__button");
		
		case 'healthline.com':
		case 'greatist.com':
		case 'medicalnewstoday.com':
			var e = _sl('#modal-host button:not(.backdrop)');
			return (e && _ev("span[contains(., 'ACCEPT')]", e) ? e : false);
		
		case 'reallygoodemails.com':
			var e = _sl('#__next > div > .container');
			return (e ? _ev("button[contains(., 'Okay')]", e) : false);
		
		case 'mitsubishielectric.com':
		case 'mea.com':
			return _sl('.cookie_policy .btn-cookie-yes');
		
		case 'bienvenue-a-la-ferme.com':
		case 'normandiealaferme.com':
		case 'lagazettedemontpellier.fr':
		case 'sufilog.com':
		case 'igbce.de':
		case 'bibliotheque.toulouse.fr':
		case 'lagazettedenimes.fr':
			return _sl('.orejimeBody-WithModalOpen .orejime-Button--save, .orejime-Layer-show .orejime-Button--save');
		
		case 'bsh-group.com':
		case 'bosch-home.com':
		case 'bosch-home.fr':
		case 'bosch-home.se':
		case 'bosch-home.nl':
		case 'bosch-home.fi':
		case 'bosch-home.at':
		case 'bosch-home.ro':
		case 'bosch-home.lu':
		case 'bosch-home.es':
		case 'bosch-home.be':
		case 'balay.es':
		case 'constructa.com':
		case 'home-connect.com':
			return _sl('.cookielaw-modal-layer.is-active .js-accept');
		
		case 'reebok.com':
		case 'reebok.co.uk':
		case 'reebok.it':
		case 'reebok.de':
		case 'reebok.nl':
		case 'reebok.fr':
		case 'reebok.be':
		case 'reebok.pl':
		case 'adidas.co.uk':
		case 'adidas.de':
		case 'adidas.it':
		case 'adidas.fr':
		case 'adidas.es':
		case 'adidas.se':
		case 'adidas.nl':
		case 'adidas.pl':
		case 'adidas.sk':
		case 'adidas.at':
		case 'adidas.pt':
		case 'adidas.dk':
		case 'adidas.no':
		case 'adidas.ie':
		case 'adidas.com':
			return _sl('.gl-modal--active > button[class*="cookie-consent"] ~ div .gl-cta--primary');
		
		case 'wakelet.com': return _sl('#cookie-banner:not([hidden]) .close__icon', _sl('wk-ui-cookier-banner', _sl('my-app').shadowRoot).shadowRoot);
		
		case 'arcteryx.com': return _sl('.cookies-disclaimer-bar[style*="auto"] .cookies-disclaimer-bar-close', _id('header-host').shadowRoot);
		
		case 'krant.volkskrant.nl':
		case 'krant.dg.nl':
		case 'krant.demorgen.be':
		case 'krant.trouw.nl':
		case 'krant.ad.nl':
		case 'krant.parool.nl':
		case 'krant.ed.nl':
			var e = _id('main');
			e = e ? _sl('login-flow', e.shadowRoot) : false;
			e = e ? _sl('privacy-consent:not([hidden])', e.shadowRoot) : false;
			return (e ? _sl('paper-button', e.shadowRoot) : false);
		
		case 'trusted.de':
			var e = _sl('trd-cookie-note', _id('trd-app').shadowRoot);
			return (e ? _sl('.ok', e.shadowRoot) : false);
		
		case 'configure.bmw.co.uk':
		case 'configure.bmw.de':
		case 'configure.bmw.at':
		case 'configure.bmw.it':
		case 'configure.bmw.fr':
		case 'configure.bmw.lu':
		case 'configure.bmw.nl':
			return _sl('.cookie-button.button-primary', _sl('con-overlay-cookies', _sl('con-overlay-logic', _sl('con-app').shadowRoot).shadowRoot).shadowRoot);
		
		case 'configure.mini.co.uk':
			return _sl('.cookie-button.button-primary', _sl('con-overlay-cookies', _sl('con-app').shadowRoot).shadowRoot);
		
		case 'm.economictimes.com':
			var e = _id('dut_agree');
			if (e) e.click();
			return e ? e.parentNode.nextSibling.nextSibling : false;
		
		case 'gezondheidsplein.nl':
		case 'ziekenhuis.nl':
			return _sl('#cookieModalIntro[style*="block"] .button');
		
		case 'mmafighting.com':
		case 'theverge.com':
			return _sl('#privacy-consent button');
		
		case 'popsci.com':
		case 'saveur.com':
			return _id('CybotCookiebotDialogBodyButtonAccept');
		
		case 'yellowbrick.nl':
		case 'yellowbrick.de':
		case 'yellowbrick.be':
			return _sl('.cc-set-cookie.btn.btn-green');
		
		case 'techopital.com':
		case 'ticsante.com':
		case 'sandro-paris.com':
			return _sl('#cookieConsent[style*="block"] #consentAllowAllCookies');
		
		case 'eschuhe.de':
		case 'chaussures.fr':
		case 'eobuwie.com.pl':
		case 'epantofi.ro':
		case 'ecipo.hu':
		case 'efootwear.eu':
			return _sl('.no-scroll .popup .button[data-testid="permission-popup-accept"]');
		
		case 'kerbalspaceprogram.com':
		case 'bs-ffb.de':
			return _sl('.wmpci-popup-close');
		
		case 'krakusik.pl':
		case 'toruniak.pl':
			return _sl('#js_rodo_window[style*="block"] .yes-to-all');
		
		case 'teamaretuza.com':
		case 'concerts-metal.com':
			return _sl('#bs-gdpr-cookies-modal.show .btn-primary');
		
		case 'theawesomer.com':
			var e = _ev("span[contains(., 'Sounds Good, Thanks')]");
			return (e ? e.parentNode : false);
		
		case 'alix-frank.com':
		case 'kontextwochenzeitung.de':
		case 'ratbacher.de':
		case 'vag.de':
		case 'schwarzwaelder-versicherung.de':
		case 'b-tu.de':
		case 'hasselbach-it.de':
		case 'rww.de':
		case 'dialux.com':
		case 'sielmann-stiftung.de':
		case 'bmeia.gv.at':
		case 'figawa.org':
		case 'auerswald.de':
		case 'smb.museum':
		case 'tuwien.at':
		case 'evz.de':
		case 'vikingeskibsmuseet.dk':
		case 'volleyball.bayern':
		case 'alpenverein-schwaben.de':
			return _sl('#cookieman-modal[style*="block"] [data-cookieman-save]');
		
		case 'jku.at': return _sl('#cookieman-modal > div[style*="block"] [data-cookieman-accept-all]');
		
		case 'digitalo.de':
		case 'voelkner.de':
		case 'smdv.de':
		case 'getgoods.com':
			return _sl('.reveal-overlay[style*="block"] .btn-cookie-consent');
		
		case 'teb.pl':
		case 'technikum.pl':
			return _sl('#cookieModal[style*="block"] #rodo_accept');
		
		case 'nintendo.de':
		case 'nintendo.fr':
		case 'nintendo.at':
		case 'nintendo.nl':
		case 'nintendo.es':
		case 'nintendo.pt':
		case 'nintendo.it':
		case 'nintendo.ru':
		case 'nintendo.ch':
		case 'nintendo.co.uk':
			return _sl('.plo-overlay--is-open .plo-cookie-overlay__accept-btn');
		
		case 'd2m-summit.de':
		case 'influencermarketingforum.de':
			return _sl('#dialogBox[style*="block"] #submitConsent');
		
		case 'jetcost.de':
		case 'voli-diretti.it':
			return _sl('#ck-modal-container .btn');
		
		case 'olesnica24.com':
		case 'korsokolbuszowskie.pl':
			return _sl('.modal[style*="block"] .btn[data-accept]');
		
		case 'lg-firmwares.com':
		case 'sfirmware.com':
			return _sl('.fancybox-is-open #gdpr-accept');
		
		case 'dsdollrobotics.com':
			var e = _sl('.pum-active[data-popmake*="eu-cookie"] .pum-close');
			if (e) e.click();
			return _sl('.pum-active[data-popmake*="one-more-thing"] .pum-close');
		
		case 'danskemedier.dk':
			return _sl('#gdpr-cookie-message:not([style*="none"]) #gdpr-cookie-accept');
		
		case 'biotechusa.hu':
		case 'biotechusa.fr':
			return _sl('#cookie-consent.remodal-is-opened #accept-cookie-settings');
		
		case 'call-a-pizza.de':
		case 'telepizza.de':
			return _sl('.fancybox-overlay[style*="block"] .js_cookies_all');
		
		case 'outdooractive.com':
		case 'touren.montafon.at':
		case 'alpenvereinaktiv.com':
		case 'termeszetjaro.hu':
		case 'teutonavigator.com':
		case 'maps.engadin.ch':
			return _sl('.oax_cookie_consent_modal .oax-cookie-consent-select-all');
		
		case 'kastner-oehler.at':
		case 'gigasport.at':
			return _sl('#quickview_cookie_settings.en_is_active span[data-action="confirm"]');
		
		case 'pcmweb.nl':
		case 'techcafe.nl':
		case 'gamer.nl':
		case 'insidegamer.nl':
			return _sl('#cookie-wall:not([hidden]) .cookie-wall-accept');
		
		case 'moomoo.io':
		case 'krunker.io':
			return _sl('#consentBlock[style*="block"] .termsBtn[onclick*="1"]');
		
		case 'zee5.com':
			var e = _sl('app-cookies-check-popup .AcceptButton');
			if (e) e.click();
			return _sl('app-cookies-check-popup .Accept');
		
		case 'idp.funktionstjanster.se':
			var e = _sl('.cookieContainer #ccbx');
			return (e && !e.checked ? e : false);
		
		case 'betriebsrat.de':
		case 'snp-online.de':
			return _sl('.cookielayermodal[style*="block"] .btn-primary');
		
		case 'alphr.com': return _sl('div[id^="sp_message"] div[class*="sp_choices"] button:nth-child(2)');
		
		case 'rockpapershotgun.com':
		case 'usgamer.net':
		case 'eurogamer.net':
		case 'eurogamer.pl':
		case 'vg247.com':
		case 'rtlxl.nl':
		case 'zdnet.com':
		case 'mensjournal.com':
		case 'crfashionbook.com':
		case 'nu.nl':
		case 'autoweek.nl':
		case 'landsend.de':
		case 'gmx.com':
			return _sl('#onetrust-banner-sdk:not([style*="none"]) #onetrust-accept-btn-handler');
		
		case 'qastack.fr':
		case 'qastack.it':
		case 'qastack.com.de':
			return _sl('#cookies-consent[style*="block"] #cookies-accept');
		
		case 'medirect.be':
		case 'medirect.com.mt':
			return _id('idCookiePolicy');
		
		case 'goetzmoriz.com':
		case 'moelders.de':
		case 'mahler.de':
		case 'gillet-baustoffe.de':
		case 'shop.bauwelt.eu':
		case 'kipp.shop':
			return _sl('.modal[style*="block"] .modal-cookie #submitAll');
		
		case 'wiertz.com':
		case 'oney.pt':
			return _sl('.accept-cookies');
		
		case 'zwolen.pl':
			var e = _sl('#g_toplayer[style*="block"] .close');
			if (e) e.click();
			return _sl('#cook:not([style*="none"]) > a');
		
		case 'mytime.de':
		case 'combi.de':
			return _sl('.modal--cookie-notice.open #accept-consent-all');
		
		case 'studio.benq.com':
		case 'adameve.com':
			return _sl('.modal[style*="block"] #btn-accept-cookies');
		
		case 'ssetelecoms.com':
		case 'sseenterprise.co.uk':
			return _sl('.cookies-not-set #cn-accept-cookie');
		
		case 'elring.com':
		case 'elring.ae':
		case 'elring.cn':
		case 'elring.com.tr':
		case 'elring.de':
		case 'elring.fr':
		case 'elring.it':
		case 'elring.pl':
		case 'elring.pt':
		case 'elring.ru':
			return _sl('#modal-cookie-info[style*="block"] .btn-accept');
		
		case 'aixfoam.com':
		case 'aixfoam.de':
		case 'aixfoam.dk':
		case 'aixfoam.fi':
		case 'aixfoam.fr':
		case 'aixfoam.nl':
		case 'aixfoam.se':
			return _sl('#cc-notification[style*="block"] .cc-button-enableall');
		
		case 'hscollective.org':
		case 'geefvoorzorgverleners.nl':
			return _sl('.cookie-consent__button--accept');
		
		case 'cexpr.es':
		case 'correosexpress.com':
		case 'correosexpress.pt':
			return _sl('.fullscreen-container[style*="block"] #cookieAceptar');
		
		case 'rodekruis.be':
		case 'vias.be':
		case 'umicore.com':
			return _sl('#cookies-banner[style*="block"] .btn-accept-all');
		
		case 'ffm.to':
		case 'orcd.co':
		case 'backl.ink':
			return _sl('.privacy-notice-gdpr .accept-cookies');
		
		case 'onecall.no':
		case 'mycall.no':
			return _sl('.modal--cookie-consent[style*="block"] [data-target="acceptCookies"]');
		
		case 'moosbande.de':
		case 'fightthenewdrug.org':
			return _sl('.pum-active[data-popmake*="slug\\":\\"cookie"] .pum-close');
		
		case 'serialowa.pl':
		case 'contemporarylynx.co.uk':
			return _sl('.pum-active[data-popmake*="rodo"] .pum-close');
		
		case 'edimax.com':
			var e = _sl('#world_lang_map[style*="block"] .cookies_close_btn span');
			if (e) _sl('#world_lang_map[style*="block"] .cookies_check').click();
			return e;
		
		case 'apiko.com':
			var e = _sl('#gatsby-focus-wrapper > div:last-child a[href*="gdpr"]');
			return (e ? e.parentNode.nextSibling : false);
		
		case 'heiligenfeld.de':
		case 'fm-systeme.de':
			return _sl('.cookie-hint #tx_cookies input[type="submit"]');
		
		case 'alltube.tv':
		case 'alltube.pl':
			var e = _sl('#cookies > span');
			if (e) e.click();
			return _sl('#rodo-popup[style*="block"] #rodo-accept');
		
		case 'skitenis.pl':
		case 'holdentalesklep.eu':
			return _sl('.fancybox-opened .acceptCondition');
		
		case 'ionos.de':
		case 'ionos.at':
			return _sl('.privacy-consent--active .privacy-consent--modal #selectAll');
		
		case 'peaks.com':
		case 'peaks.nl':
			return _sl('#cookie-modal.show .bubble');
		
		case 'mnisek.cz':
		case 'covid19awareness.sa':
			return _sl('.elementor-popup-modal:not([style*="none"]) .elementor-button[href*="close"]');
		
		case 'kyoceradocumentsolutions.eu':
		case 'kyoceradocumentsolutions.de':
			return _sl('.-is-visible[data-gdpr-manage-cookies-popup] .c-button[data-datalayer-event*="Accept"]');
		
		case 'crowdlitoken.ch':
			var e = _sl('#root > .shadow a[href*="privacy-policy"]');
			return (e ? e.previousSibling : false);
		
		case 'otelo.de':
			var e = _sl('.GlobalDialogs a[href*="datenschutz?set-consent"]');
			return (e ? _sl('.GlobalDialogs .TextLink--buttonFilled') : false);
		
		case 'eigene-ip.de':
		case 'verifyemailaddress.org':
			return _sl('main > .flex > #accept');
		
		case 'uniroyal.pl':
		case 'continental-reifen.de':
			return _sl('.ci-privacyhint-close');
		
		case 'toolstation.nl':
		case 'toolstation.fr':
			return _sl('#eu-cookies-notice[style*="block"] #eu-cookies-notice-yes');
		
		case 'karriere.at':
		case 'jobs.at':
			return _sl('.k-blockingCookieModal__button');
		
		case 'materna.de':
		case 'bamf.de':
			return _sl('.mfp-ready #cookiebanner .consentToAll');
		
		case 'peek-cloppenburg.at':
		case 'peek-cloppenburg.de':
		case 'greenweez.com':
		case 'fashionid.de':
			return _sl('.show #accept-all-cookies');
		
		case 'chartoo.de':
		case 'chartoo.fr':
		case 'chartoo.at':
		case 'chartoo.ch':
		case 'chartoo.co.uk':
		case 'chartoo.in':
		case 'chartoo.com':
			var e = _sl('body > div > div:last-child a[href*="/privacy"]');
			return (e ? _sl('[id] + [class] + [id] + [class] + [id]', e.parentNode.nextSibling) : false);
		
		case 'conclude.com':
		case 'thinkproject.com':
			return _sl('.mfp-ready #cookieConsent .btn[data-cookie="accepted"]');
		
		case 'cropp.com':
			return _sl('#pageHeader div[data-selen-group="cookies-bar"] button');
		
		case 'coolblue.nl':
		case 'coolblue.be':
			return _sl('.button[name="accept_cookie"]');
		
		case 'cdn.privacy-mgmt.com':
		case 'cmp.focus.de':
		case 'cmp.chip.de':
		case 'cmp2.bild.de':
		case 'sourcepoint.n-tv.de':
		case 'consent.faz.net':
		case 'tcf2.telegraph.co.uk':
			return _sl('.message-component[title*="OK"], .message-component[title*="Accept"], .message-component[title*="Akkoord"], .message-component[title*="akzeptieren"], .message-component[title*="Akzeptieren"], .message-component[title*="Zustimmen"], .message-component[title*="ZUSTIMMEN"]');
		
		case 'miltenyibiotec.com':
		case 'bioplanete.com':
			return _sl('#modal-cookie[style*="block"] #saveCookies');
		
		case 'landratsamt-dachau.de':
		case 'landkreis-regensburg.de':
		case 'sinzing.de':
			return _sl('.mfp-ready .cookieselection-confirm-selection');
		
		case 'delhaize.be':
		case 'mega-image.ro':
		case 'ab.gr':
			return _sl('.js-cookies-modal:not(.hidden) .js-cookies-accept-all');
		
		case 'mazda.de':
		case 'mazda.fr':
		case 'mazda.ch':
		case 'mazda.es':
		case 'mazda.pl':
		case 'mazda.hu':
			return _sl('.main-header div[data-module="cookie-notice"] div[class*="CookiePanel-accept-button"] > div');
		
		case 'isny.de':
		case 'oberstdorf.de':
		case 'alpinschule-oberstdorf.de':
		case 'hotel-mohren.de':
		case 'ok-bergbahnen.com':
		case 'tramino.de':
			return _sl('.TraminoConsent.show button[value="acceptConsentAll"]');
		
		case 'system.t-mobilebankowe.pl':
			var e = _ev("span[contains(., 'Zamknij')]");
			return (e ? e.parentNode.parentNode.parentNode : false);
		
		case 'bever.nl':
		case 'asadventure.com':
		case 'cotswoldoutdoor.com':
			return _sl('#body-wrapper div[data-hypernova-key="AEMScenes_CookieMessage"] .as-a-btn--fill');
		
		case 'sachsen-fernsehen.de':
		case 'radio-trausnitz.de':
		case 'radioeins.com':
		case 'regio-tv.de':
		case 'radio-bamberg.de':
			return _sl('.cmms_cookie_consent_manager.-active .-confirm-selection');
		
		case 'gongfm.de':
			return _sl('.cmms_cookie_consent_manager.-active .-confirm-all, #radioplayer-cookie-consent .cookie-consent-button');
		
		case 'l-bank.de':
		case 'l-bank.info':
			return _sl('#bmLayerCookies.AP_st-visible .AP_mdf-all');
		
		case 'wetransfer.com': return _sl('#tandcs[style*="block"] #accepting.enabled, .transfer__window.terms-conditions .transfer__button, .infobar--terms .button, .welcome--cookies .welcome__button--accept');
		
		case 'gmx.net':
		case 'gmx.ch':
		case 'gmx.at':
		case 'web.de':
			return _sl('#cmp #save-all-conditionally');
		
		case 'thesocialmedwork.com':
		case 'vandalism-sounds.com':
			return _sl('#notice-cookie-block[style*="block"] .allow');
		
		case 'music.yandex.ru':
		case 'music.yandex.com':
			return _sl('.gdpr-popup__button');
		
		case 'virginaustralia.com':
		case 'mediathekviewweb.de':
			return _id('cookieAcceptButton');
		
		case '0calc.com':
		case '0rechner.de':
		case '0calc.fr':
			return _sl('#cookieconsentmodal[style*="block"] button[name="cookies"]');
		
		case 'weltbild.de':
		case 'weltbild.at':
			return _sl('.reveal-overlay[style*="block"] .dsgvoButton');
		
		case 'backstagepro.de':
		case 'regioactive.de':
			return _sl('#dialogconsent[style*="block"] #acceptall');
		
		case 'buchhandlung.de':
		case 'bookzilla.de':
			return _sl('.modal[style*="block"] .consent-banner-confirmation-button');
		
		case 'stoffe.de':
		case 'myfabrics.co.uk':
			return _sl('body[style*="fixed"] #cookieOverlay .cookie-accept');
		
		case 'samsonite.ch':
		case 'samsonite.de':
		case 'samsonite.fr':
		case 'samsonite.co.uk':
			return _sl('.overlay-wrapper--visible .cookie-consent-overlay__actions .btn--primary');
		
		case '12xl.de':
		case 'heilsteinwelt.de':
			return _sl('#cookieNote[style*="block"] .btn-primary');
		
		case 'tvmalbork.pl':
		case 'jelenia.tv':
			return _sl('#rodoModal[style*="block"] .btn-success');
		
		case 'catawiki.nl':
		case 'catawiki.de':
		case 'catawiki.com':
			return _id('cookie_bar_agree_button');
		
		case '6play.fr':
			var e = _sl('body[style*="hidden"] > div > aside .is-primary:first-child');
			if (e) setTimeout(function(){e.click();}, 1000);
			return e;
		
		case 'canaldigital.se':
		case 'canaldigital.no':
			return _sl('.cookieconsentv2--visible .js-accept-cookies-btn');
		
		case 'check24.net':
		case 'lavera.de':
			return _sl('.modal[style*="block"] [data-cookie-accept-all]');
		
		case 'sixt-neuwagen.de':
		case 'sixt-leasing.de':
			return _sl('.coo button:first-child');
		
		case 'henschel-schauspiel.de':
			var e = _sl('#approveform .arrlink');
			if (e) _id('cconsentcheck').click();
			return e;
		
		case 'gsk-gebro.at':
		case 'voltadol.at':
			return _sl('.cookie-banner--visible .cookie-banner__button--accept');
		
		case 'biblioteka.wroc.pl': return _sl('#cookie-notice[style*="block"] .js-accept-cookies');
		case 'svenskakyrkan.se': return _sl('.cookies__bar.is-active .js-cookies-accept-all');
		case 'k15t.com': return _sl('.reveal[style*="block"] .cookiesAccepted');
		case 'gamestar.de': return _sl('.modal[style*="block"] .cmp-accept');
		case 'tieranwalt.at': return _sl('.fxCookiesWindowsBodyClass .fxCookieWindowAllLink');
		case 'monese.com': return _sl('.cookie-banner__wrapper button[data-testid*="accept"]');
		case 'bazarcasasole.com': return _sl('.fancybox-overlay[style*="block"] .cookiesplus-modal .btn-primary');
		case 'secondsol.com': return _sl('.modal[style*="block"] .btn-success-cookie');
		case 'werkenbijlidl.nl': return _sl('#CybotCookiebotDialog.opened .cookie-alert-extended-button');
		case 'kasuwa.de': return _sl('#ccModal[style*="block"] .btn-primary');
		case 'ihreapotheken.de': return _sl('.modal[style*="block"] #acceptCookieConsent');
		case 'ns.nl': return _sl('.cookie-notice button + button');
		case 'adler-farbenmeister.com': return _sl('.page-wrap--cookie-permission:not(.is--hidden) .cookie-permission--accept-button');
		case 'malighting.com': return _sl('.cs-cookie__wrapper:not([style*="none"]) .js-save-cookie-settings');
		case 'notaris.be': return _sl('.c-bar[style*="block"] .c-btn');
		case 'legia.com': return _sl('#main ~ div .button[href*="cookies"] ~ button');
		case 'duvel.com': return _sl('#cookiebanner[style*="block"] .js-cookie-accept');
		case 'schwaebisch-hall.de': return _sl('.cookie-note[style*="block"] .js-cookie-accept-ok');
		case 'ls-tc.de': return _sl('.modal[style*="block"] .accept');
		case 'spielexikon.de': return _sl('input[name="edit-property-cookie-accept"]');
		case 'etepetete-bio.de': return _sl('.modal[style*="block"] .accept-all-button');
		case 'kofferraumwannen.de': return _sl('#PrivacyCategoryAlert[style*="block"] .btn-primary');
		case 'neliosoftware.com': return _sl('.nelio-cookie-modal:not([style*="none"]) button');
		case 'uvex-safety.com': return _sl('.modal-cookie .btn + .btn');
		case 'roompot.de': return _sl('.cookiebar:not([style*="none"]) .js-cookies-accept');
		case 'cocktaildatenbank.de': return _sl('.show #d-cc--confirm');
		case 'dkms.pl': return _sl('.cc-window-active .cc-dismiss');
		case 'bo.de': return _sl('#footer-consent[style*="block"] #reiff-consent-accept');
		case 'rittal.com': return _sl('.swal-overlay--show-modal .--primary');
		case 'idoc.eu': return _sl('.is--active .cookie-permission--accept-button');
		case 'ufz.de': return _sl('#cookie-banner[style*="block"] .btn-success');
		case 'sofatutor.com': return _sl('.reveal-overlay[style*="block"] .all-cookies');
		case 'quooker.de': return _sl('#cookie_wrapper:not([style*="none"]) .cookie_close');
		case 'shoot-club.de': return _sl('.modal[style*="block"] .set_all_cookies');
		case 'imoradar24.ro': return _sl('#modal-cookies[style*="block"] .accept');
		case 'uniqa.at': return _sl('.tingle-modal--visible .cc_buttons-accept_all_cookies');
		case 'handy-deutschland.de': return _sl('#privacy-settings .button-primary');
		case 'police-auction.org.uk': return _sl('.modal[style*="block"] .btn[onclick*="cookie_agree"]');
		case 'hemdenbox.de': return _sl('#s-cookie-consent[style*="block"] #s-cookie-consent-accept-all');
		case 'centogene.com': return _sl('#cookie-settings[style*="block"] #cookie-settings-btn-apply');
		case 'sendgb.com': return _sl('.cookie_checker[style*="block"] ~ .sendgb_cookiewarning .cookiebutton');
		case 'realm667.com': return _id('cookiehintsubmit');
		case 'gezond.nl': return _sl('#cookie-dialog[style*="block"] #cookie-submit');
		case 'golem.de': return _sl('#gspmessage #btnsimplec');
		case 'montanacolors.com': return _sl('.mfp-ready .cookies .bot');
		case 'lbbw.de': return _sl('.component-data-protection-consent.show .action-save-settings');
		case 'deka.de': return _sl('.mfp-ready .js-accept-selected-cookies');
		case 'litebit.eu': return _sl('.cookie-consent button');
		case 'dpam.com': return _sl('#consent-tracking[style*="block"] .close');
		case 'my.nintendo.com': return _sl('.CookiePolicyModal .Modal:not([style*="none"]) .btn-primary');
		case 'aboalarm.de': return _sl('.modal.show #cmp-accept-all-initial');
		case 'shpock.com': return _sl('#__next ~ div[id*="modal"] div[class*="PrivacyConsent"] button');
		case 'dobrzemieszkaj.pl': return _sl('.AcceptAndCloseRODO');
		case 'indiearenabooth.com': return _sl('#cookie-consent:not([style*="none"]) #btn-cookie-consent-positive');
		case 'joyn.de': return _sl('#__next > div > div > button[data-test-id="UC"]');
		case 'schrotty-2.ticket.io': return _sl('.modal-cookie[style*="block"] .btn-primary');
		case 'tme.eu': return _sl('.o-modal-wrapper--active[modal-context="rodo"] button');
		case 'besteproduct.nl': return _sl('.modals.active .cookieWall-btn');
		case 'wetter.com': return _sl('.cmp-prevent-scroll #cmp-btn-accept');
		case 'metro.de': return _sl('#footer div[style*="block"] .field-accept-button-name');
		case 'stabila.com': return _sl('.mod_cms_accept_tags.block #cms_close_button');
		case 'pibank.es': return _sl('#cookies-block:not([style*="none"]) .aceptar');
		case 'verksamhetslokaler.se': return _sl('.modal-wrapper.shown #cookies_agreement_panel .green');
		case 'interfriendship.de': return _sl('#cookies-dlg:not([style*="none"]) .cdlg-accept-all');
		case 'bmi.bund.de': return _sl('.mfp-ready #cookiebanner .js-close-banner');
		case 'heinz.st': return _sl('#cookiebar[style*="block"] .accept');
		case 'hetwkz.nl': return _sl('#cookieConsent .button[data-cookie*="yes"]');
		case 'aptekagemini.pl': return _sl('.vue-privacy-policy__button:not(.button--hollow)');
		case 'alternate.de': return _sl('.cookie-acceptance-media-consent-accept');
		case 'betway.se': return _sl('.fixed-body .bwCookiePolicy .bwButton');
		case 'mrc-trading.de': return _sl('#etrpop.modal[style*="block"] .btn-success');
		case 'xiaomiromania.com': return _sl('.fancybox-opened .cp-accept');
		case 'dark.netflix.io': return _sl('.abs-fill[class*="cookie-policy"] button');
		case 'mycare.de': return _sl('#cookie-settings-content[style*="block"] #btn-cookie-accept');
		case 'erdbeerprofi.de': return _sl('#gdpr-cookie-container #btn-cookie-allow');
		case 'pharmazeutische-zeitung.de': return _sl('#ccm .ccm_button_green');
		case 'dotomi.com': return _sl('.btn-continue[onclick^="cjil"]');
		case 'penny.at': return _sl('.v-dialog--active #btnOK');
		case 'komplettbank.se': return _sl('.kb-cc[style*="block"] .kb-cc-btn_main');
		case 'novado.de': return _sl('#cookie-block[style*="block"] #btn-allow');
		case 'provostvet.co.uk': return _sl('.consent-wrapper.show #js-cw-accept');
		case 'onwebchange.com': return _sl('.cookie_banner .btn-primary');
		case 'brauerei-spezial.de': return _sl('.mfp-ready .avia-cookie-close-bar');
		case 'vodafone.nl': return _sl('.googlemaps-iframe-wrapper .cookie-yes, .cookiewall__wrapper:not([style*="none"]) .cookiewall__accept');
		case 'strato.de': return _sl('body > .consent:not(.hidden) #consentAgree, #cookie_overlay:not(.hidden) #consentAgree');
		case 'texels.nl': return _sl('.show-cookie-notice .cookie-closer');
		case 'coperion.com': return _sl('.is-visible .button[data-cookie-close="accept"]');
		case 'lotto.pl': return _sl('.privacy-popup.active .orange-btn');
		case 'mehilainen.fi': return _sl('.MuiDialog-root[class*="Consent"] button + button');
		case 'llamaya.com': return _sl('.MuiDialog-root.cookies-modal .set-all');
		case 'tre.se': return _sl('.MuiDialog-root .MuiButton-containedPrimary');
		case 'openx.com': return _sl('.ox-localization.active .ox-confirm');
		case 'evileg.com': return _sl('#privacy_policy_dialog[style*="block"] .btn[data-dismiss]');
		case 'testzentrale.de': return _sl('.cookie-settings[style*="block"] .secondary');
		case 'danskebank.dk': return _sl('body > div[data-module="cookie-consent-banner"]:not([style*="none"]) #button-accept-all');
		case 'johner-institut.de': return _sl('#cookie-disclaimer[style*="block"] .cookie-button');
		case 'karriere-jet.de': return _sl('.fancybox-is-open .cookie-permission--accept-button');
		case 'medis.pt': return _sl('#cookiedismiss .btn');
		case 'gramatica-alemana.es': return _id('cookiewarning_a');
		case 'ageas.co.uk': return _sl('#cookie[style*="block"] .cookie__btn');
		case 'audemarspiguet.com': return _sl('.odo-dialog--visible .js_cookie-policy-popup__accept-all');
		case 'vejdirektoratet.dk': return _sl('.ng-scope[ng-show="cookieDialogActive"]:not(.ng-hide) .cookie_button[ng-click*="accept"]');
		case 'norwegian.com': return _sl('.nas-element-cookie-consent__accept-all-button');
		case 'ferchau.com': return _sl('.modal .cookie__buttons .red');
		case 'wapex.pl': return _sl('.modal[style*="block"] .btn[onclick*="CookieAccept"]');
		case 'sunny.co.uk': return _sl('.cookie-acceptance-modal button[name="accept-cookies-button"]');
		case 'pacma.es': return _id('panel_cookies_todas');
		case 'impulse.de': return _sl('.imp-cc-accept');
		case 'dailyfx.com': return _sl('.dfx-cookiesNotification--visible .jsdfx-cookiesNotification__close');
		case 'hufeisenkrater.de': return _sl('#cookieNotice[style*="block"] .btn-success');
		case 'vomp.tirol.gv.at': return _sl('.bemCookieOverlay__btn--acceptAll');
		case 'inp-gruppe.de': return _sl('#colorbox[style*="block"] .js_cm_consent_submit');
		case 'cinkciarz.pl': return _sl('#cookies-modal[style*="block"] .btn-primary');
		case 'joingoodcompany.nl': return _sl('#cookie-accept:not(.hide) .cookie-btn');
		case 'fanfiktion.de': return _sl('#colorbox[style*="block"] #ff-consent-close');
		case 'perpedale.de': return _sl('#newCookieJar:not([style*="none"]) .button_high');
		case 'flex-tools.com': return _sl('.cookieBar--active .js-accept-cookie-bar');
		case 'taschen.com': return _sl('#ConsentManagerModal[style*="block"] #cookie_accept_all');
		case 'stationsdeski.net': return _id('accept_rgpd');
		case 'laboratoire-cellmade.fr': return _sl('#cookies:not([style*="none"]) #btnAcceptCookie');
		case 'stiftung-managerohnegrenzen.de': return _sl('.v--modal-overlay[data-modal="cookie-modal"] .btn');
		case 'videoload.de': return _id('OVERLAY-CONFIRM');
		case 'v.calameo.com': return _sl('.consent.cookies .btn');
		case 'blasmusik-burgenland.at': return _sl('#appendto:not([style*="none"]) #showCookieserlauben');
		case 'ooma.com': return _sl('.gdpr_cookie_overlay:not(.d-none) #accept_cookie');
		case 'takko.com': return _sl('.cookie-policy-box .set-all-cookies');
		case 'singaporeair.com': return _sl('.modal-mask:not([style*="none"]) .confirm .popup__explicit__cookie, .popup--cookie-handling:not(.hidden) .btn-full');
		case 'hundeschmuck.store': return _sl('#myModal[style*="block"] form[action*="analytics"] .btn');
		case '118.lt': return _sl('#privacy-page-body #modal-btn-accept');
		case 'mini.de': return _sl('.md-if-frame:not([style*="none"]) .md-iframe-consent-message--fallback-teaser .btn');
		case 'one-insurance.com': return _sl('one-cookies-dialog one-theme-button');
		case 'yoyogames.com': return _sl('#cookie.is-showing #yoyo-cookie-accept');
		case 'techoral.com': return _sl('#myCoockie[style*="block"] .btn[data-dismiss]');
		case 'cancercentrum.se': return _sl('#cookie-modal[style*="block"] .cookie-modal-consent-btn');
		case 'stadtwerke-quickborn.de': return _sl('.HrSys-Gips-DivIBox .consent-banner button');
		case 'masmovil.es': return _sl('mm-ui-cookie-disclaimer .btn[ng-click*="acceptAll"], .gmm-cookies.basic .gpb-accept-all');
		case 'cashper.de': return _sl('.cookie-modal[style*="block"] .btn-primary');
		case 'zlm.nl': return _sl('#cookie-modal.in .btn-primary');
		case 'wienholding.at': return _sl('#modalCookieGeneral[style*="block"] .btn-accept-all');
		case 'niko.eu': return _sl('.c-cookie.is-active .c-cookie__accept button');
		case 'billiger-aufladen.de': return _sl('#dsModal[style*="block"] .btn');
		case 'resultsbase.net': return _sl('.bootbox.modal[style*="block"] #btnCookiesAcceptAll');
		case 'hot.at': return _sl('.bootbox.modal[style*="block"] .js-saveAllCookies');
		case 'ima.it': return _sl('.acceptAllCookies');
		case 'aion.be': return _sl('.cookies-notification.active #recommended-cookies');
		case 'lebara.com': return _sl('#cookiesConsentModal[style*="block"] .btn[onclick*="accept"]');
		case 'malcoded.com': return _sl('.MuiDialog-root button');
		case 'polska6.pl': return _sl('.modal[style*="block"] .btn[data-pole="akceptuje"]');
		case 'wesendit.com': return _sl('#CookieInformation[style*="block"] #acceptCookie');
		case 'doppelherz.de': return _sl('.cookie-inquiry-wrapper.show .button[data-button="accept"]');
		case 'freenet-energy.de': return _sl('.modal[style*="block"] #cookie_ok');
		case 'norwegian.no': return _sl('nas-element-cookie-consent[style*="block"] .nas-button[class*="accept"]');
		case 'amewi.com': return _sl('.ck-hinweis[style*="block"] .save-cookie-options');
		case 'fysikoaerioellados.gr': return _sl('.cookies-consent-overlay:not(.hidden) .btn-cookies-accepted');
		case 'husqvarna-bicycles.com': return _sl('universal-cookie-consent .ucc-button--primary');
		case 'dubplate.be': return _sl('#gdpr-banner[style*="block"] .js-gdpr-accept');
		case 'badewanneneinstieg.at': return _sl('._brlbs-btn[data-borlabs-cookie-unblock]');
		case 'sportiva.com': return _sl('#popup-privacy-policy:not([style*="none"]) .btn-cookie');
		case 'tk.de': return _sl('.is-display-consentmanager .g-consentmanager__confirm-all');
		case 'redbook.com.au': return _sl('.csn-gdpr-modal button');
		case 'telia.lt': return _sl('.in .js-cookie-modal-accept');
		case 'traderfox.com': return _id('tfcookie-accept-all');
		case 'lunar.app': return _sl('#cookieConsent.show .MuiButtonBase-root');
		case 'burgerking.pl': return _sl('.modal.visible .cookies-modal .button');
		case 't-mobile.nl': return _sl('#cookiePopup.show .button-primary');
		case 'tele2.nl': return _sl('#cookiePopup.show .button-green');
		case 'altomdinhelse.no': return _sl('.modal[style*="block"] .vicky-cookie-yes');
		case 'westfalen.igbce.de': return _sl('#first_confirmation_button.eupopup-button');
		case 'quorn.co.uk': return _sl('.cmp-btn[onclick*="save"]');
		case 'kjell.com': return _sl('#container > div > div:last-of-type > div > button');
		case 'axa-im.fr': return _sl('.gh-accept-cookie-disclaimer');
		case 'gruener-punkt.de': return _sl('#cookie-modal[style*="block"] input[data-cookie="all"]');
		case 'coolmath.com': return _sl('.gdpr-overlay-container[style*="visible"] .accept-all-cookies');
		case 'hosteurope.de': return _sl('.ReactModal__Overlay--after-open .UPM__PrivacyModal span + span button');
		case 'lumeo.chip.de': return _sl('#cookie-wall .buttons-wrapper > div + div .im-button');
		case 'zeit.de': return _sl('#main[data-ct-area="decision-main"] .box__accbtn button');
		case 'm.bancopopular.com': return _sl('#popup-cookieinfo:not(.hide) #btn-dmp-continue');
		case 'stat.si': return _sl('.surs-cookies-wrapper[style*="block"] .surs-cookie-button-yes');
		case 'faidatehobby.it': return _sl('#cl_modal .btn_main_yes');
		case 'smplayer.info': return _sl('.well .lead.text-center > .btn.active[href*="forum"]');
		case 'ipaddress.com': return _sl('#cc-wrapper[style*="block"] #cc-accept-btn');
		case 'telenor.no': return _sl('.global-overlay-block.show .button-cta.blue a');
		case 'telenor.se': return _sl('.cookie-consent-modal .cookie-consent-modal__footer button');
		case 'ugenr.dk': return _sl('#gdpr-consent:not([style*="none"]) .accept');
		case 'ipc.be': return _sl('.cookiebox.show .btn-primary');
		case 'gezondeideetjes.nl': return _sl('.cookie-modal[style*="block"] button[onclick*="doCookie"]');
		case 'hagerzplan.de': return _sl('#modalCookies.in .btn-hager');
		case 'sunday.dk': return _sl('button[data-test-id="CookieBanner-CloseButton-Button"]');
		case 'freo.nl': return _sl('.popover-frame--visible #CookieAcceptMain');
		case 'saperesalute.it': return _sl('#cookieban .cookie');
		case 'archimag.com': return _sl('.eupopup-button_1');
		case 'eplan.education': return _sl('.mfp-ready .modal_cookie_consent_accept');
		case 'rotterdammersvoorelkaar.nl': return _sl('.cookie-notice-wrapper.mfp-ready .button-confirm');
		case 'bcc.nl': return _sl('#cookiewallmodal.in .btn-primary');
		case 'wuestenrot.cz': return _sl('#cookie-modal.is-active .js-cookie-law-aggre');
		case 'fabrykacukiernika.pl': return _sl('.rodo-popup[style*="block"] button');
		case 'ostrzegamy.online': return _sl('.rodo-popup[style*="block"] button[data-cookie-name]');
		case 'bauder.de': return _sl('#cookieWarningText .privacy ~ a');
		case 'beamtic.com': return _sl('#data_consent.consent_popup button');
		case 'dclaw.co.uk': return _sl('#dialog-cookies .btn-primary');
		case 'instagram.com': return _sl('button.coreSpriteDismissLarge');
		case 'cookiewall.vice.com': return _id('i-agree');
		case 'emerce.nl': return _sl('.cc-container a#btn');
		case 'fr12.nl': return _id('cookies');
		case 'latagliatellayyo.es': return _sl('#AcceptCookies ~ #Buttonholder > input');
		case 'marktplaats.nl': return _sl('#track-accept .button');
		case 'mdsrl.it': return _sl('.cookie-modal .ui-button');
		case 'medtronic.nl': return _sl('.acceptcookies');
		case 'online-store.mercedes-benz.de': return _sl('.cookie-layer__close');
		case 'mercedes-benz.com': return _sl('.modal-cookie-warning .modal-close, .dcp-cookie-notification-close-trigger');
		case 'sogeti.nl': return _sl('input[name="cookiewall_answer"] + .button');
		case 'blog.daimler.de': return _sl('.modal-close[title*="Akzeptieren"]');
		case 'mazda-autohaus-schwenke-duisburg.de': return _sl('button[name="Akzeptieren"]');
		case 'zomoto.nl': return _sl('#lnkAccept span');
		case 'runtervomgas.de': return _sl('#cookie-bar a');
		case 'teesbusinesscompass.co.uk': return _sl('#cookiepanel + .ui-dialog-buttonpane button');
		case 'qlstats.net': return _sl('#accept button[onclick*="acceptCookiePolicy"]');
		case 'openlibra.com': return _sl('#ol-cookie-policy button');
		case 'zilverenkruis.nl': return _id('cookiedrie');
		case 'weeronline.nl': return _sl('img[src*="storage.weeronline.cloud/cookies"] ~ .btn-accept, button[class*="wol-cookies-module__btn_acceptAll"]');
		case 'wampirki.com': return _sl('#NavigationBar1 a');
		case 'tradukka.com': return _sl('#cookies_consent button');
		case 'radioveronica.nl': return _sl('.button[onclick*="allowCookies"]');
		case 'zorgverzekeringhema.nl': return _sl('#cookiemelder button');
		case 'meandermc.nl': return _sl('#meanderCookieDialog button');
		case 'longines.it': return _sl('.widget-cookie .allow');
		case 'alternativa.fr': return _id('sub_cookie');
		case 'groepsaccomodaties.org': return _sl('input[name="cookie_answer"] + .button_yes');
		case 'paskoluklubas.lt': return _sl('.cookies-buttons .button');
		case 'etransport.pl': return _sl('.NovemediaCookiePolicy .approve');
		case 'skyradio.nl': return _sl('.cookie-wall .button');
		case 'payback.it': return _sl('#modal_CookieConsentOverlay .pb-button[data-dismiss]');
		case 'privacy.sbs.nl': return _sl('#settings-form .submit-button-small');
		case 'telegraafvandaag.nl': return _sl('.ott-bottom #button-agree');
		case 'outlet.mediamarkt.nl': return _id('cookie-consent');
		case 'monnikenwerk.pzc.wegenerwordpress.nl': return _sl('.pronamic_accept_button');
		case 'rd.nl': return _sl('#myModal.in input[onclick="cookieInfo.setLevel(1)"]');
		case 'petitpalais.paris.fr': return _sl('.disclaimer .close');
		case 'fashionlab.nl': return _sl('#cookiewarning button[onclick*="close_cookie_agreement"]');
		case 'opencaching.de': return _sl('.cookie-notice--body #js--cookie-notice--close-button');
		case 'tube.nl': return _sl('button.js-cookie-consent');
		case 'rechtopgeld.nl': return _sl('#cookiewet .btn-success');
		case 'reindicium.com': return _sl('#myModal .btn[onclick*="setCookie"]');
		case 'm.leroymerlin.pl': return _sl('.popup-close-button');
		case 'fristadskansas.com': return _sl('label[for="UserAcceptedCookies2"]');
		case 'ikgastarten.nl': return _sl('.cookie-processed .agree-button a');
		case 'cookiesv2.publiekeomroep.nl': return _sl('.btn[onclick*="submit"]');
		case 'tripplite.com': return _sl('#cookieMsg a[onclick="tl.setEUcookie();"]');
		case 'second-hand-ikea.com': return _sl('#cookie_melding .link_button2');
		case 'relaischateaux.com': return _sl('.cnil-isvisible .close-cnil');
		case 'tournamentsoftware.com': return _sl('#cookies__modal .btn--secondary');
		case 'polskifrontend.pl': return _ev("a[contains(., 'Rozumiem')]");
		case 'fnatic.com': return _ev("button[contains(., 'Got it')]");
		case 'granice.pl': return _ev("button[contains(., 'Akceptuję')]");
		case '24kitchen.nl': return _sl('.cookie-container .submit-button');
		case 'henkel-reiniger.de': return _sl('.js-close-cookielayer');
		case 'gerritveldman.nl': return _sl('.gvca_ok_link');
		case 'hampshire.spydus.co.uk': return _sl('form[action*="ALLOWCOOKIES"] input[name="ACSUBMIT"]');
		case 'dulcogas.it': return _sl('.standalonelink[title="chiudere"]');
		case 'britishairways.com': return _sl('.cookieModalButton, .fancybox-overlay[style*="block"] #accept_ba_cookies');
		case 'weather-gb.com': return _sl('#privacy_consent_Modal[style*="block"] .btn[onclick*="Save"]');
		case 'bjuvsbostader.se': return _sl('#cookiecheck .btn');
		case 'zwangerschapspagina.nl': return _sl('.accept[href*="setcookie"]');
		case 'subaru.de': return _sl('.CookieLayer__button');
		case 'autovisie.nl': return _id('akkoord_text');
		case 'gva.be': return _sl('.cookie-banner button');
		case 'tradeplace.com': return _id('UIAcceptCookies_UIHyperLinkAccept');
		case 'team-rauscher.at': return _sl('.cookie.header .enable');
		case 'muddymatches.co.uk': return _id('cookie_permission_submit');
		case 'nebulacodex.com': return _sl('#capa .verde');
		case 'parliamentlive.tv': return _id('cookiesAccept');
		case 'ragepluginhook.net': return _sl('form[action*="CookieGate.aspx"] #acceptButton');
		case 'ravenblack.net': return _sl('input[type="submit"][value="I consent to this use of cookies"], input[onclick="eu_consent();"]');
		case 'scorito.com': return _sl('.cookieWallPreviewShutter + div #btnReturn');
		case 'sep.gr': return _id('apodoxiBtnCookies');
		case 'metronieuws.nl': return _sl('.container > button[onclick="accept()"]');
		case 'second-hand-watch.com': return _sl('.link_button2[onclick*="CookieOptIn"]');
		case 'withgoogle.com': return _sl('a[href="http://www.cookiechoices.org"] + button');
		case 'tweakers.net': return _sl('#cookieAcceptForm button');
		case 'truste.com': return _sl('.pdynamicbutton .call, #gwt-debug-close_id');
		case 'lebar.sncf.com': return _sl('div[class*="CookieModal"] button + button');
		case 'suchdichgruen.de': return _sl('.important-notice .close-it');
		case 'smgcookies.nl': return _sl('.accept_box a.iaccept');
		case 'ratebeer.com': return _sl('input[type="button"][value="OK"]:not([id]):not([class])');
		case 'livep2000.nl': return _sl('.messagediv > a[href*="cookies"] ~ button[name="ok"]'); // livep2000.nl/monitor/cookieChoice.html
		case 'secureworks.co.uk': return _sl('.dsw-cookie-disclaimer .dsw-button');
		case 'nike.com': return _sl('.hf-modal-view.is-active .js-hf-cookie-accept, .cookie-settings-button-container .js-yes-button');
		case 'my.moneypolo.com': return _sl('#cookie-strip .close-cookie');
		case 'choice.npr.org': return _sl('.user-actions #accept');
		case 'imhd.sk': return _sl('#cookieNotice a[href="#"]');
		case 'euroclix.nl': return _sl('#cookiesPreferencesForm button.press');
		case '9gag.com': return _sl('.gdpr.modal .blue');
		case 'mendrulandia.es': return _sl('#ventana #v_btAceptar');
		case 'cookiewall.finnik.nl': return _sl('.box form button[name="button"][type="submit"]');
		case 'hm.com': return _sl('#gdpr-modal .js-read-gdpr');
		case 'dokterdokter.nl': return _sl('.reveal-overlay[style*="block"] .button[name="acceptAllCookies"]');
		case 'motodesguacehnosgonzalez.com': return _sl('#cookies_policy.fade.in .btn-primary');
		case 'i-say.com': return _sl('.critical-modal.in .btn-primary');
		case 'atlasobscura.com': return _sl('#cookie-consent-modal.in .btn');
		case 'purevpn.com': return _id('CTA_gdbrcontinue_analytic');
		case 'ivoox.com': return _sl('#gdpr-modal .btn-default');
		case 'discordbots.org': return _sl('.button[onclick*="HasSeenAnnoyingPopup"]');
		case 'slate.com': return _sl('.gdpr-form__consent');
		case 'wizaserwis.pl': return _sl('#promoinfo.open .modal-close');
		case 'mtc-it4.be': return _sl('.modal.fade.in .panel-warning .btn-warning');
		case 'time.com': return _sl('.gdpr-form .btn');
		case 'playtv.fr': return _sl('.grdp-button');
		case 'vanpartner.com': return _sl('.cookieslaw .closeBtn');
		case 'guce.oath.com': return _sl('.consent-form .agree-button-group .btn, .consent-container .btn[name="agree"]');
		case 'pathe.nl': return _sl('.btn[onclick*="CookieNotification.Accept"]');
		case 'allyouneedfresh.de': return _sl('#frmNoCookiesModal > a');
		case 'shmoop.com': return _sl('.btn.eu-opt-in, .privacy-notice .privacy-agree');
		case 'theforestmap.com': return _sl('.modal.fade.in #acceptcookies');
		case 'commentreparer.com': return _sl('#rgpd .btn.btn-danger');
		case 'societe.com': return _sl('#cookiesmodale .Button[name="cookiesall-oui"]');
		case 'zeelandnet.nl': return _sl('.modal__button--accept[href*="cookie"]');
		case 'gnkdinamo.hr': return _sl('#privacyPolicyModal.in .btn-confirm');
		case 'voyageforum.com': return _id('consent_button');
		case 'windguru.cz': return _id('butt_consent_psads_ok');
		case 'jobbird.com': return _id('gdpraccept');
		case '17track.net': return _sl('#modal-gdpr.in .btn-warning');
		case 'toestemming.ndcmediagroep.nl': return _sl('form[action*="consent"] .buttons input');
		case 'alarmeringen.nl': return _sl('#modal #msg #accept');
		case 'ticketea.com': return _sl('#cookies-acceptance');
		case 'finn.no': return _sl('.modal--is-active .button[href*="personvern"] + .button--cta');
		case 'aoib.dk': return _id('consent-module-text-button');
		case 'hajduk.hr': return _sl('.cookie-popup__close');
		case 'overdrive.com': return _sl('.featherlight[style*="block"] .set-cookie__form input[type="submit"], #gdpr-modal[style*="block"] .cookie-popup__save, .cookieSettingsModal.open .confirm.button');
		case 'tappedout.net': return _sl('#gdpr-modal.in #tos-accept');
		case 'soccerstats.com': return _sl('.button[onclick*="cookiesok"]');
		case 'hanos.nl': return _sl('.banner_message[data-hanos-cookie-disclaimer][style*="block"] .btn[data-hanos-cookie-disclaimer-agree]');
		case 'brooksrunning.com': return _sl('.consent-form .consent-form__button.a-btn--primary');
		case 'hindustantimes.com': return _sl('.cookieswindow #agree');
		case 'avid.com': return _id('siteAlertAccept');
		case 'otpbank.hu': return _sl('.gdpr-btn-container .btn.btn-primary');
		case 'logicsupply.com': return _sl('.primary-button[href*="opt-in/?response=agree"]');
		case 'foodnetwork.co.uk': return _sl('.cookie-message .btn[value="Accept"]');
		case 'foodnetwork.com': return _sl('.cookie-message .btn[value="Accept"]');
		case 'maa.nl': return _sl('.btn.accept-cookies');
		case 'chomikuj.pl': return _sl('#AcceptChomikujTermsForm .greenButtonCSS');
		case 'hertz.com': return _sl('#light-box-1 .lb-close');
		case 'immobilien.net': return _sl('#root > div > div > section > p + .button.button--primary');
		case 'monsterhunterworld.com': return _sl('#gdpr.active #accept a');
		case 'imvu.com': return _sl('.privacy-policy-adult-dialog .accept-cookies');
		case 'postimees.ee': return _sl('.body--cookie-notification-visible .notification--cookie .notification__button');
		case 'livvin.com': return _sl('#welcome-message button[class*="Button__StyledButton"]');
		case 'werksite.nl': return _sl('.modal.show .btn[href*="allow"]');
		case 'allbinos.com': return _sl('.w3-modal[style*="block"] .w3-button[onclick*="polityka"]');
		case 'max.se': return _sl('.infoBanner .button');
		case 'newstalk.com': return _sl('#consent_modal.in .btn:not(.show-manage-settings)');
		case 'online.no': return _sl('.close-disclaimer .autofocus-el');
		case 'openpli.org': return _sl('div[onclick^="euCreateCookie"]');
		case 'privacy.vakmedianet.nl': return _sl('.general-cta-btn');
		case 'evaair.com': return _sl('#cookie-banner.in .btn-cookie-banner, #colorbox[style*="block"] #cookies .positive'); // flights...
		case 'bluelagoon.com': return _sl('#app > div > p ~ button');
		case 'zekur.nl': return _sl('.cookie-consent .btn.agreed');
		case 'elevensports.it': return _sl('#elevensports-privacy .close');
		case 'findaphd.com': return _sl('.cookieNoticeA .closeTab');
		case 'akamai.com': return _sl('.accept[data-module^="cookies"]');
		case 'mtmad.es': return _sl('button[class*="cookiesAlert__accept_button"]');
		case 'deondernemer.nl': return _sl('.cookiewall #cookiewall .button, button[name="acceptCookies"]');
		case 'todopvr.com': return _sl('#Button1[onclick*="cookiesOK"]');
		case 'clusterr.io': return _sl('cl-cookies-message .cl-btn');
		case 'schneider-umformen.de': return _sl('.cookie .button');
		case 'diabeter.nl': return _sl('#cookies button[name="cookies"]');
		case 'logistik-express.com': return _sl('#dsgvo[style*="block"] #cookies.lebutton-farbe');
		case 'kramp.com': return _sl('.cookie-message .button');
		case 'oskolaf.pl': return _sl('#modal-info.in .btn-podstawowy');
		case 'prvikvadrat.hr': return _sl('.modal.in .button--brand');
		case 'carglass.it': return _sl('#gdpr_compliance .button');
		case 'mapy.geoportal.gov.pl': return _sl('.appWelcome:not(.hide) .tos-button[onclick*="yes"]');
		case 'mkidn.gov.pl': return _sl('#myModal.in .btn-default');
		case 'gdansk.wios.gov.pl': return _sl('.sbox-content-adopt[style$="1;"] + #sbox-btn-close');
		case 'purepla.net': return _sl('.gdpr-cookies .agree-btn');
		case 'paypal-community.com': return _sl('.ui-dialog[style*="block"] #disclaimer #firstvisitbtn');
		case 'malmo.se': return _sl('#gdprConsent[style*="block"] .gdprConsent__btn');
		case 'group.rwe': return _sl('.cb--active .cb__button--select-all');
		case 'wavesplatform.com': return _ev("span[contains(., 'ALLOW ALL')]");
		case 'ad.win.nl': return _sl('#cookieConsentBox[style*="block"] #cookieConsent');
		case 'kiplinger.com': return _sl('.kip-gdpr button');
		case 'rabobank.com': return _id('allowcookies');
		case 'robens-dn.de': return _sl('.grpelem > .Button');
		case 'retailtrends.nl': return _sl('.alert #accept');
		case 'nytimes.com': return _sl('.GDPRcta-btn, #cta-link-expanded-small.anchor_accept_cta, .shown.expanded button:first-child, #accept_cta[class*="banner"], .js-cookie-banner-link-optin');
		case 'rofl-nerd.net': return _sl('input[name="consent"] + .btn');
		case 'jordans3d.planningwiz.com': return _sl('#policyModule .button');
		case 'chess24.com': return _sl('.dataConsentPopup[style*="block"] #data-consent-opt-in-all');
		case 'ing.com': return _sl('.cookie_consent[style*="block"] .btn, #cookiesDialog paper-button.ing-orange-tpp-cookies-dialog, .fancybox-wrap[style*="block"] #bcpm-altnotification-ok'); // think, developer ...
		case 'n26.com': return _sl('#gdpr-notice > div > div > div > button:first-child');
		case 'boligsiden.dk': return _sl('.modal.in .cookie-modal .o-btn');
		case 'royalenfield.com': return _sl('.re-cookie[style*="block"] .re-cookie-rht a');
		case 'teenmegaworld.net': return _sl('.cookie button');
		case 'belsat.eu': return _sl('.pum-active[data-popmake*="polityka"] .pum-close, .pum-active[data-popmake*="politika"] .pum-close, .pum-active[data-popmake*="policy"] .pum-close, .pum-active[data-popmake*="palityka"] .pum-close');
		case 'gg.pl': return _sl('.pum-active[data-popmake*="cookie-policy"] .pum-close');
		case 'uhdr.de': return _sl('.pum-active[data-popmake*="cookie-zustimmung"] .pum-close');
		case 'gazetabilgoraj.pl': return _sl('.pum-active[data-popmake*="komunikat"] .pum-close');
		case 'huonoaiti.fi': return _sl('.pum-active[data-popmake*="cookie-consent"] .pum-close');
		case 'poliambulatoriotalenti.it': return _sl('.pum-active[data-popmake*="uso-cookie"] .pum-close');
		case 'paks-bayern.weebly.com': return _sl('.banner .wsite-button[href*="willkommen"]');
		case 'hey.car': return _sl('button[data-qa*="cookieBanner-acceptBtn"]');
		case 'orliman.pl': return _sl('.policy .button--accept');
		case 'iradio.ie': return _sl('#myPrivacy.in .consentt');
		case 'chordify.net': return _sl('.consent-accept-all');
		case 'beardbrand.com': return _sl('.fancybox-opened .js-cookie-accept');
		case 'atal.pl': return _sl('.fancybox-opened .button-goInvest');
		case 'jointcommission.org': return _sl('.ui-dialog[style*="block"][aria-labelledby*="Cookies"] .ui-state-default:first-child');
		case 'pcimag.com': return _sl('form[action*="gdpr-policy"] input[value="Accept"]');
		case 'pharmindex-online.hu': return _sl('#cookie_modal.in .btn[onclick*="cookieHide"]');
		case 'autotrader.nl': return _sl('button[aria-label="cookie-agreement"]');
		case 'aurubis.com': return _sl('.cookiepopup-close:not([style*="none"])');
		case 'tvasta.pl': return _sl('#infoModal.in .btn[data-dismiss]');
		case 'powiatslubicki.pl': return _sl('#myModal.in .btn[data-dismiss]');
		case 'agar.io': return _sl('#cc-notification[style*="block"] .cc-approve-button-thissite-ads');
		case 'f1racing.pl': return _sl('#box > #text + ul a[href*="x-set-cookie"]');
		case 'vivaldi.com': return _sl('#comments a[onclick*="AcceptCookies"]');
		case 'infosecurity.nl': return _sl('.btn[value="Akkoord"][onclick^="Send"]');
		case 'zurzeit.eu': return _sl('body > p > strong > a[href*="boxen/zur-zeit-aktuell"]');
		case 'webstaurantstore.com': return _sl('#user-data-policy-modal.show .btn[data-dismiss]');
		case 'paris.fr': return _sl('.html-wrapper .button[data-action="allow_cookies"]');
		case 'stockhouse.com': return _sl('input[name="privacy-acceptance"] + .button');
		case 'meldpuntwegen.be': return _sl('.step-page.visible .cookie-melding.volledig + .button');
		case 'crowdestate.eu': return _sl('.modal.in .btn[ng-click*="gdprSave"]');
		case 'fctwente.nl': return _sl('.js-modal-cookie.is-visible .js-modal-accept');
		case 'ipla.tv': return _sl('app-rodo-rules-modal button + button');
		case 'tcroomburg.nl': return _sl('.cookiewall .btn-primary');
		case 'hepster.com': return _sl('.tingle-modal--visible .btn-cookie-primary');
		case 'okpal.com': return _sl('#js-hook-cookie .btn');
		case 'martinus.cz': return _sl('#gdpr.is-active .mj-gdpr-accept');
		case 'vox.pl': return _sl('#pgwModal #rodo_accept');
		case 'consent.talpanetwork.com': return _sl('meer-accept-cookie-policy meer-button, .package-choice-page button');
		case 'donneespersonnelles.rdvconso.org': return _sl('.ui-cookies .accept');
		case 'tipsyelves.com': return _id('cookie-consent-accept');
		case 'codra.net': return _sl('.cookie-consent.cookie--visible .btn');
		case 'kidioui.fr': return _sl('.blockingCookieAck .cookieACK .btn'); // voiture
		case 'milliman.com': return _sl('#cookieSection[style=""] .fillBtn');
		case 'goldenline.pl': return _sl('#profiling-agreement.in .btn.agree, .notice.info.alert .close');
		case 'beerwulf.com': return _sl('#dontAgreeAndEighteenContainer:not(.hide) #agreeAndEighteen');
		case 'ben.nl': return _sl('.cookie-wall-container .button--green');
		case 'wylecz.to': return _id('accept-targeting-disclaimer-button');
		case 'morrisonsislistening.co.uk': return _sl('#AcceptCookies ~ #Buttonholder #NextButton');
		case 'replika.ai': return _sl('a[href*="privacy"] + button');
		case 'investors.com': return _id('gdpr-accept-button');
		case 'e-sochaczew.pl': return _sl('#RODOCOOKIE.in .btn[onclick]');
		case 'norgips.pl': return _sl('#cookiemodal.in #accept-cookies-checkbox');
		case 'brieftip.pl': return _sl('#cookieModal.show #cookieAcceptBtn');
		case 'shoppable.com': return _sl('#cookiesModal.in .btn[data-dismiss]');
		case 'kaliber.pl': return _sl('#cookieModal.in .btn[onclick]');
		case 'travelchannel.co.uk': return _sl('#cppd .accept');
		case 'sites.google.com': return _sl('a[href^="https://www.google.com/policies/technologies/cookies/"] + div');
		case 'totalcasino.pl': return _sl('.popup-container[style*="block"] .gdpr-popup .accept_gdpr');
		case 'trubendorffer.nl': return _sl('#cookie_notice_popup.show .cta_button.primary');
		case 'jobserve.com': return _sl('#CookiePolicyPanel #PolicyOptInLink');
		case 'unive.nl': return _sl('#consent-wrapper .close-modal');
		case 'guce.yahoo.com': return _sl('#gucRefreshPage .loader-text a[href*="guccounter=2"]');
		case 'consent.yahoo.com': return _sl('.consent-wizard .btn.agree, .consent-form .btn[name="agree"], .error-wizard .btn.try-again-link');
		case 'eneco.nl': return _sl('.ReactModal__Overlay--after-open #AcceptCookiesButton');
		case 'pieseauto.ro': return _sl('.cookie-wall .js-submit');
		case 'dhbbank.nl': return _sl('#cookieModalCenter.show #cookieModalAcceptButton');
		case 'wurth.es': return _sl('.lity-opened #grpd-fancy #cookie-success');
		case 'midas.co.za': return _sl('.cookiemodal.in .btn[data-dismiss]');
		case 'asnbank.nl': return _sl('.cookie-preference-modal .modal-visible .cookie-accept'); // hypotheken
		case 'voidu.com': return _id('eu-cookie-ok');
		case 'lavalleedestortues.fr': return _sl('.reveal-overlay[style*="block"] #modalCookies .button[href*="accept"]');
		case 'smartshop.hu': return _sl('.c-gdpr button');
		case 'alpin-chalets.com': return _sl('.overlay.active[data-overlay="privacy"] .overlay_close');
		case 'fimfiction.net': return _sl('.cookie-consent-popup button[type="submit"]');
		case 'keepersecurity.com': return _sl('.cookie-consent-popup[style*="block"] .cookie_accept');
		case 'bakken.nl': return _sl('.cookie-info__button button');
		case 'quizme.pl': return _sl('#modal-consent[style*="block"] #give-consent-btn');
		case 'k-mag.pl': return _sl('.v--modal-rodo .btn-agree');
		case 'doka.com': return _sl('#cookie-modal--info.uk-open .uk-modal-close');
		case 'nieuwspoort.nl': return _sl('.reveal-overlay[style*="block"] #cookie-consent .button[href*="accept"]');
		case 'flybe.com': return _sl('#cookie-policy-modal.in #accept-cookies');
		case 'meteovista.be': return _sl('div[class*="cookies-module"] button[class*="acceptAll"]');
		case 'cookies-accept-nl.weeronline.cloud': return _sl('.content > .btn-accept');
		case 'cashconverters.be': return _sl('#dialogRGPD.in .btn[onclick*="accept"]');
		case 'buzz.ie': return _sl('#gdpr-consent-notice[style=""] .gdpr-button-consent');
		case 'rjwatches.com': return _sl('app-gdpr-modal .agree-wrapper button');
		case 'contractix.de': return _sl('.b7cConsent .b7cButton button');
		case 'startsmarthome.de': return _sl('#dws01-modal:not(.hidden) .close-modal'); // service
		case 'auchan.hu': return _sl('.cookie-modal__button--accept'); // online
		case 'hech.be': return _sl('.bootbox-alert.in .btn-primary');
		case 'forever21.com': return _sl('#cookiesPopup[style*="block"] button[onclick*="AcceptCookie"]');
		case 'assemblymag.com': return _sl('.gdpr-policy + form[action*="gdpr"] .button[value="Accept"]');
		case 'hondanews.eu': return _sl('#cookiesPolicyBanner[style*="block"] .caption-anchor[onclick*="createCookieConsent"]');
		case 'cameo.com': return _id('cookie-policy-banner-close-btn');
		case 'vandebron.nl': return _sl('.cookiebar-container .cookiebar-button');
		case 'allelectronics.com': return _sl('#simplemodal-container #cookie-consent-accept');
		case 'zorgdirect.nl': return _sl('.c-modal.is-cookie.is-active #submitCookie');
		case 'bosch-mobility-solutions.com': return _sl('.disableCookieScroll .btn-coockie');
		case 'studio-eight.com': return _id('cookieAgreementSubmit');
		case 'tmdn.org': return _sl('#content #buttonBox ._button');
		case 'rituals.com': return _sl('.js-accept-cookies');
		case 'mysuzuki.hu': return _sl('.reveal-overlay[style*="block"] .js-accept-cookies');
		case 'hema.nl': return _sl('.cookie-message[style*="block"] #accept-cookies'); // foto
		case 'gosh.no': return _sl('.modal.in #agreed_privacy_policy');
		case 'bokadirekt.se': return _sl('#cookie-modal .cookie-modal-button.primary');
		case 'hrblock.com': return _sl('.show-cookie-banner-eu #cookie-banner-eu .cbe__yes');
		case 'analog.com': return _sl('#cookie-consent-container.in .btn-success');
		case 'zwijsen.nl': return _sl('.cookie-consent .cookie-consent-link');
		case 'burton.com': return _sl('.gdpr-lightbox.opened .js-accept');
		case 'aldi-blumen.de': return _sl('.message_overlay[style*="block"] .button.center');
		case 'giz.berlin': return _id('privacyInformationClose');
		case 'msn.com': return _sl('#cacpageoverlay .accept, .optanon-allow-all-button, #onetrust-banner-sdk:not([style*="none"]) #onetrust-accept-btn-handler');
		case 'bk.com': return _sl('#cookie-popup[style*="block"] .btn-primary');
		case 'paravol.org': return _sl('.cookie-modal.in .btn[onclick*="agreeAndContinue"]');
		case 'lyricstraining.com': return _sl('#privacy-update-dialog[style*="block"] .accept');
		case 'filmweb.pl': return _sl('.rodoBoard .rodo__buttons button');
		case 'streamelements.com': return _sl('#root > div > div > button');
		case 'pizzafan.gr': return _sl('#accept_cook.in #accept_cook_1 .button');
		case 'kiddle.co': return _sl('.warning_message .cookie_btn');
		case 'mcdonalds.be': return _sl('.c-languages-page__button[href*="languages-page-accepted"]');
		case 'zorg-en-ict.nl': return _sl('.cookiewall-body .btn');
		case 'taimweser.com': return _sl('#modalCookies[style*="block"] #aceptarTodasCookies');
		case 'hanos.be': return _sl('.banner_message[data-hanos-cookie-disclaimer][style*="block"] .btn[data-hanos-cookie-disclaimer-agree]');
		case 'surplus-lemarsouin.com': return _sl('#modal.show .btn[onclick*="Accept"]');
		case 'worldarchitecture.org': return _sl('#prvcsetModal.in #aggr');
		case 'bynco.com': return _sl('.cookie-accept-button .btn');
		case 'walmart.ca': return _sl('.privacy-open #accept-privacy-policies');
		case 'holmesplace.com': return _sl('.disableScroll .cookie-footer button');
		case 'klickmal.at': return _sl('#cookiemodal[style*="block"] .btn');
		case 'thewirecutter.com': return _sl('span[data-gtm-trigger="cookie_banner_dismiss"]'); // e
		case 'zemskidki.ru': return _sl('.warning-top--cookies:not([style*="none"])');
		case 'bethesda.net': return _sl('visor-alert a[href*="cookie-policy"] + div');
		case 'audi.co.uk': return _sl('.welcome-modal-content_after-open[aria-label*="Cookie"] .welcome-modal-content__close-button');
		case 'mtglotusvalley.com': return _sl('.v-dialog--active.v-dialog--persistent button + button');
		case 'canyon.com': return _sl('.modal.is-open #js-data-privacy-save-button');
		case 'talparadio.nl': return _sl('div[class*="CookieDialog__cookies__button"] > a');
		case 'bigbigchannel.com.hk': return _sl('.cookie_banner_padding #accept_cookie_policy');
		case 'brugge.be': return _sl('.cookie-preferences.in .js-btn-accept-all');
		case 'ps.be': return _sl('#CookieAlert.in .btn-primary');
		case 'soesterberg.nu': return _sl('.c-accept .wdpu-close');
		case 'sportmaniac.ro': return _sl('#gdprModal:not([style*="hidden"]) #accept-all-2');
		case 'fluidui.com': return _sl('#gdprModal.in .gdprModalBtn');
		case 'fotowien.at': return _sl('.js-cookie-consent.overlay--visible .js-cookie-consent-ok');
		case 'usefyi.com': return _sl('.marketing__modalContainer .GDPR-saveButton');
		case 'saxion.edu': return _sl('.cookie-wall-open .js-allow-cookies');
		case 'patient.info': return _sl('#cookie-policy-overlay[style*="block"] .alert__close');
		case 'abus.com': return _id('cookieChoiceDismiss'); // mobil
		case 'imobiliare.ro': return _sl('#modalCookies.in .btn-actiune');
		case 'azoresgetaways.com': return _sl('#cookie-alert-popup.in #cookie-ok');
		case 'muzyczneradio.pl': return _sl('#modal-rodo.in .btn-success');
		case 'rynek-turystyczny.pl': return _sl('#modal-rodo[style*="block"] #saveCookiesAccept');
		case 'axa-corporatesolutions.com': return _sl('.js-root > div > div > div > div > div > div > div > a:first-child + a');
		case 'gofundme.com': return _sl('.hd_alert a[href*="privacy"] ~ a.js-close-button');
		case 'drjacobs-shop.de': return _sl('.cookieModal #acceptCookies');
		case 'tixr.com': return _sl('.overlay-active #overlay .button[action="confirm"]');
		case 'puydufou.com': return _sl('#rgpd-cookie-block.cookiergpd-actif .accept-cookie');
		case 'kokoroe.fr': return _sl('#rgpdmodal.in #closeRgpd');
		case 'toni-maccaroni.de': return _sl('.fancybox-opened .cookiemessage .button');
		case 'vijfhart.nl': return _sl('.cookie-alert[style*="display"] .cookie__accept');
		case 'tapperuse.nl': return _sl('.cookie-notice-popup__close.btn');
		case 'fideliti.co.uk': return _sl('.ui-dialog[style*="block"] #ctl00_CookieControl1_AcceptCookieButton');
		case 'dellmont.com': return _sl('#privacyModal.in .btn-success');
		case 'volkskrant.nl': return _sl('.button--accept[href*="cookiewall"], .button--accept[onclick*="cookie"], .button--accept[href*="accept"], .cookie-modal .btn.accept-cookies-button[href^="/Cookie/HasConsent"], #CookieWall .wall .ButtonCta');
		case 'gelmar.co.za': return _ev("button[contains(., 'I consent')]");
		case 'infor.pl': return _sl('.infor-rodo #linkOk'); // e
		case 'godbolt.org': return _sl('#alert.modal.show .close');
		case 'gefran.com': return _sl('.fancybox-opened #cookie-policy .btn-primary');
		case 'weforum.org': return _ev("button[contains(., 'I accept')]"); // intelligence
		case 'instock.nl': return _sl(".has-consent-popup .b-consent-popup .js-close-consent-popup");
		case 'aia.gr': return _sl("#pcmsCookieDialog .agreeCookie");
		case 'converse.com': return _sl("#modal-cookiePolicy.modal-active .accept-button");
		case 'tnt-click.it': return _sl(".mfp-ready .mfp-close");
		case 'tiger.nl': return _sl('.reveal-overlay[style*="block"] #cookieMessage .ConsentButton');
		case 'cookieservice.aginsurance.be': return _sl('.ag-CookieConsentWrapper button[ng-click*="allowAllCookies"]');
		case 'vietnamairlines.com': return _sl('.cookie-accept-box:not([style*="none"]) #cookie-agree');
		case 'bauermedia.co.uk': return _sl('#cookies-modal.in .c-btn[data-ref="cookies-agree"]');
		case 'dlawas.info': return _sl('#rodo-moda.lin .btn-rodo-accept'); // krotoszyn
		case 'inrs.fr': return _sl('#GDPRCookiesConsentBanner .accept');
		case 'veloenfrance.fr': return _sl('#conditions.in #oui');
		case 'xn--nringslivnorge-0ib.no': return _sl('#vicky-cookiebox[style*="block"] .vicky-cookie-yes'); // næringslivnorge.no
		case 'flikflak.com': return _sl('.reveal-overlay[style*="block"] .js-modal-cookie-accept');
		case 'rpgrealm.nl': return _sl('.button[href*="cookies/accept"]');
		case 'renaultfinanciacion.es': return _sl('.active .cssnk_modal__button--accept_and_continue');
		case 'tvplayer.com': return _sl('.modal.show #cookie-consent-modal .btn, #cookie-consent-modal.in .btn'); // e
		case 'meurthe-et-moselle.fr': return _sl('.modal.in .btn[onclick*="CookiesOk"]'); // rando
		case 'e3expo.com': return _sl('body > div > div[class^="view__Background"] button[class^="view__SubmitButton"]'); // live
		case 'saudia.com': return _sl('.ui--popup[style*="block"] .approve-website-cookies #travelContinue');
		case 'blocket.se': return _sl('#accept-ufti'); // mobil
		case 'binance.je': return _sl('#__next > .layout > main ~ div a[href*="support.binance.je"] + div');
		case 'casadellibro.com': return _sl('.header ~ div > button');
		case 'autopunkt.pl': return _sl('#modal-cookies.in .cookie-save');
		case 'hirado.hu': return _sl('#cookie:not([style]) .hms_cookeBbc_activate');
		case 'checkvenlo.nl': return _sl('.cc-grower .cc-banner:not(.cc-invisible) .cc-btn[aria-label="allow cookies"]');
		case 'gulbenkian.pt': return _sl('.js-cookie-consent.in .js-cookie-submit');
		case 'saa.nl': return _sl('.GDPR-popup.show .btn[ng-click*="savePrivacy"]');
		case 'mltracker.co.uk': return _sl('#cookieModal.show .close');
		case 'otpportalok.hu': return _sl('.pop_up_bg .cookie_button_col_btn button');
		case 'arte.tv': return _sl('.popup_cookies.active .button.active, .modal[style*="block"] #acceptAllCookiesBtn');
		case 'cip.nl': return _sl('.container > .justify-content-center #accept');
		case 'jm.se': return _sl('.cookie-accept-modal .button--main-cta');
		case 'motofaktor.pl': return _sl('.rodo[style*="flex"] .rodo-accept');
		case 'pactcoffee.com': return _sl('#app > div > div > a[href*="cookies"] + button');
		case 'danishfamilysearch.com': return _sl('.cookie-notice #btn_cookieok');
		case 'essent.nl': return _sl('#cookieConsentModal[style*="block"] #cookie-statement-accept-cookies-default');
		case 'medicijnnodig.nu': return _sl('.ui-dialog[style*="block"] #cw_message_ok');
		case 'seb.ee': return _sl('.seb-cookie-consent:not(.hidden) .accept-selected');
		case 'rodoviariadooeste.pt': return _sl('.pea_cook_wrapper #pea_cook_btn');
		case 'argenta.be': return _sl('#cookieConsentModal:not([aria-hidden]) #acceptAllCookiesBtn');
		case 'elsate.com': return _sl('#cookies_types + div > .button[onclick*="setCookie"]');
		case 'noriel.ro': return _sl('.agreementMessage[style*="table"] .daAgree');
		case 'vinbanken.se': return _sl('.fancybox-overlay[style*="block"] .cookie-takeover-inner > a');
		case 'mobilevikings.be': return _sl('.cookieWall.isVisible #btn-accept-cookies, .cookieWall.isVisible .button[data-jest-id="accept"]');
		case 'qioz.fr': return _sl('#cookies-popup[style*="block"] #acceptCookies');
		case 'union.nl': return _sl('.c-cookie-bar[data-redirect] .cookie-bar__button[js-hook-cookies-accept]');
		case 'melcloud.com': return _sl('#divCookie[style*="block"] .cookie-link a + a');
		case 'dane.gov.pl': return _sl('.modal.show #footer-close');
		case 'vakantieveilingen.nl': return _sl('.tingle-modal--visible .btn[data-click="cookies/accept"]');
		case 'ivolta.pl': return _sl('#rodo_open #cookiebar-accept-btn');
		case 'krefting.de': return _sl('#cookieNote.in .close');
		case 'usercontrol.co.uk': return _sl('#cookieconfirm:not([style*="none"]) button'); // e
		case 'viberate.io': return _sl('#modal-cookies[style*="block"] #btn-cookies-accept');
		case 'piraeusbank.gr': return _sl('#cookie-bar.fixed .cb-enable');
		case 'spatiicomerciale.ro': return _sl('#modalCookies[style*="block"] .btn-actiune--principal');
		case 'snyk.io': return _sl('#cookie-disclaimer #cookie-link');
		case 'resources.techcommunity.microsoft.com': return _sl('.has-cookie-bar #catapultCookie');
		case 'tikkio.com': return _sl('.mfp-ready #gdpr-accept');
		case 'mozio.com': return _ev("span[contains(., 'Agree, hide this')]");
		case 'materialdistrict.com': return _sl('.md-modal-cookie #accept');
		case 'autobahn.eu': return _sl('#app-main > .consent-front .btn-success');
		case 'alan.com': return _sl('#root > div > button');
		case 'elsevier.com': return _sl('#cookie-modal[style*="block"] #accept-cookies'); // journalinsights
		case 'viva.gr': return _sl('.cc-bar .cc-btn');
		case 'jeugdbrandweer.nl': return _sl('.cookiewall .button');
		case 'corbby.com.pl': return _sl('.termspopupcontainer .termsagree');
		case 'membersuite.com': return _sl('.cc-window .cc-btn'); // e
		case 'songsterr.com': return _sl('header ~ section #accept');
		case 'cfos.de': return _sl('.modal[style*="block"] .btn[onclick*="accept_cookies"]');
		case 'lego.com': return _sl('button[class*="CookieDisclaimerButton"]');
		case 'live.globalplayer.com': return _sl('.gdpr-modal .gp-btn');
		case 'webmd.com': return _sl('.eugdpr-consent-button');
		case 'conseil-national.medecin.fr': return _sl('.rgpd[style*="block"] input[type="submit"]');
		case 'bunq.com': return _sl('.cookie-consent-modal-displayed .button-action-save-cookie-settings');
		case 'eon.de': return _sl('.cookie.in[style*="block"] #cookieLayerAcceptButton');
		case 'cloudvps.com': return _sl('.js-generic-module[action*="cookie-consent"] button');
		case 'kitsound.co.uk': return _sl('#cookie_consent_container .accept');
		case 'skip-me.top': return _sl('.sweet-alert[style*="block"] .got-cookie');
		case 'bosch-heroes.com': return _sl('.BoschPrivacySettingsV2.is-open .BoschPrivacySettingsV2__button');
		case 'paradoxplaza.com': return _sl('#cookies-info:not(.cookie-info-disabled) .accept-cookie-policy');
		case 'yello.de': return _sl('#cookieconsent[open] .js-cookie-consent-action, .modal-stage--open .js_cookie-accept');
		case 'rambus.com': return _sl('.consent-modal[style*="block"] #consent_agree');
		case 'kayak.pl': return _sl('.cdk-overlay-container .ok-button');
		case 'bien-zenker.de': return _sl('.cookie-settings-submitall');
		case 'enbw.com': return _sl('.dialog.opt-in-dialog .eventelement-trackingOptIn, #cookie-overlay-modal.modal-stage--open .js_cookie-accept, .overlay-agreement .button--primary, .modal .cookie-agreement__confirm button');
		case 'akkuteile.de': return _sl('#CookiePlus[style*="block"] #CPConfirm');
		case 'soliver.de': return _sl('.jsPrivacyBarSubmit');
		case 'otwarteklatki.pl': return _sl('#popup-gdpr.visible .button-gdpr-agree');
		case 'erdinger.de': return _sl('.overlay.s-is-open .cp-confirmSelected');
		case 'luxortheater.nl': return _sl('.cookiewallBox #acceptCookies');
		case 'e-wie-einfach.de': return _sl('.js_modal_cookie[style*="block"] .js_btn_set_all');
		case 'slagelse.info': return _sl('.hustle-show .hustle-optin-mask ~ .hustle-popup-content .hustle-button-close');
		case 'stadt-kuehlungsborn.de': return _sl('#cookieModal[style*="block"] .fixed-cookie-button');
		case 'sklep.regmot.com.pl': return _sl('.mfp-ready #RodoPopup .mfp-close');
		case 'engie-energie.nl': return _sl('#cookieModal[style*="block"] .button.close-modal');
		case 'adac-shop.de': return _sl('.has--cookiebot .cookiebot--close + button');
		case 'resume.se': return _sl('#__next > header ~ div > p ~ a[color]');
		case 'signatur.frontlab.com': return _id('ctl00_cookieDisclaimerAcceptedBtn');
		case 'mymuesli.com': return _sl('.popup-instance.show[data-identifier="cookies-consent"] .tm-cookies-consent-accept');
		case 'springlane.de': return _sl('#cookieLayer:not(.hidden) .js-btn-cookie-allow');
		case 'trans-missions.eu': return _sl('.cookie-modal.show a[onclick*="agreeAndContinue"]');
		case 'bcee.lu': return _sl('.modal[style*="block"] .bcee-cookies-manager-accept');
		case 'chainethermale.fr': return _sl('.modal__overlay--opened .cookie-notice__actions .primary');
		case 'lunii.fr': return _sl('.cookies-main-container .submit-button');
		case 'bbva.es': return _sl('.cookiesgdpr__acceptbtn');
		case 'amsterdamlightfestival.com': return _sl('#cookie-consent-app .cookie-consent__btn');
		case 'blitzhangar.com': return _sl('.cookie-consent-banner__accept');
		case 'dermasence.de': return _sl('#copr-settings-wrap[style*="block"] #copr-safe-settings');
		case 'cinemaxx.de': return _sl('.modalCookies.active .modalCookies_button-all');
		case 'amministrazionicomunali.it': return _sl('#cp-container:not([style*="none"]) #cookie-policy-agree-onlynecessary a');
		case 'healthsoul.com': return _sl('#GDPRModal[style*="block"] #GDPR-button');
		case 'telekom.com': return _sl('.lightbox.cookie-optin-layer.done .btn[rel="js-cookie-optin-set"]');
		case 'iberiaexpress.com': return _sl('#cookiesTermsModal[style*="block"] #acceptCookiesTerms');
		case 'leroymerlin.fr': return _sl('#privacy_bandeau[style*="block"] #js-privacy_all_accept');
		case 'kieskeurig.nl': return _sl('.js-consent-accept');
		case 'hogrefe.de': return _sl('.fancybox-is-open #fancybox-cookie-consent-settings .set-setting');
		case 'colors-effects.eu': return _sl('.ce-cookieSettings .ce-btn-light');
		case 'piw.pl': return _sl('.fancybox-is-open #rodo-modal .btn');
		case 'bbcchildreninneed.co.uk': return _sl('#modal-cookieConsent.is-active #cincpt_cookie_accept');
		case 'eplanusa.com': return _sl('#fancybox-wrap[style*="block"] .modal_cookie_consent_accept');
		case 'oneal.eu': return _sl('#cookie_settings:not([style*="none"]) .button2');
		case 'mulders-opel.nl': return _sl('.modal[style*="block"] #legal-cookie-accept');
		case 'bricomarche.com': return _sl('.js-GlobalPopin .CookieParameters .Button--success');
		case 'parfuemerie.de': return _sl('.fancy-box-containerCookiemanager.fancybox-opened #accept-cookies-all');
		case 'womex.com': return _sl('.modal[style*="block"] #accept-cookies-all');
		case 'filmboxlive.com': return _sl('.mobox-wrapper[style*="block"] #cookiePolicyOK');
		case 'olimerca.com': return _sl('#modalCookies.in .btn[onclick*="Accept"]');
		case 'alpro.com': return _sl('.scroll-locked div[class^="StyledCookiesModal"] button[class*="Primary"]');
		case 'howardrecords.com': return _sl('#root > div > div > button');
		case 'global.commerce-connector.com': return _sl('.cookie-notice > a');
		case 'kingstoncentre.co.uk': return _sl('.gdpr-cookie-control-popup.fancybox-is-open .consent-all');
		case 'fitx.de': return _sl('.cookie_overlay--shown .cookie_overlay__button--all');
		case 'dat.de': return _sl('#cookienotice_box.initialised #cookienotice_box_accept_all');
		case 'nerim.com': return _sl('#cookies-box[style*="block"] .accept-cookies');
		case 'energyavenue.com': return _sl('.fancybox-overlay[style*="block"] .green-btn[href*="acceptcookies"]');
		case 'contasconnosco.pt': return _sl('.modal-mask--cookies button');
		case 'stoffenshop.eu': return _sl('#cookiePoppup[style*="block"] .btn-success');
		case 'vodafonetvonline.es': return _sl('.ngdialog .link[ng-click*="cookies.accept"]');
		case 'win2day.at': return _sl('.cookie-notification[style*="block"] .commitSelection');
		case 'knative.dev': return _sl('#cookieModal[style*="block"] .btn[onclick*="accept"]');
		case 'careers.yardi.com': return _sl('#cmw-confirm-cookies[style*="block"] #cookieCheckAcceptAll');
		case 'de.vanguard': return _sl('div[data-ng-include*="disclaimer"] #acceptPolicy');
		case 'hardware.info': return _sl('.cookie-wall__body .cookie-wall__cookie-container #decision[name="accept"]');
		case 'swindi.de': return _sl('#privacy-modal[style*="block"] .btn-success');
		case 'lifecell.net': return _sl('#cookie-modal[style*="block"] #cookie-agree');
		case 'infineon.com': return _sl('#cookie-modal[style*="block"] .btn-submit');
		case 'philasearch.com': return _sl('#cookie-modal[style*="block"] .button.primary');
		case 'devdocs.io': return _sl('._notif._in ._notif-link[data-behavior="accept-analytics"]');
		case 'naekranie.pl': return _sl('#modal-rodo-info[style*="block"] .accept-rodo');
		case 'mol.hu': return _sl('.popup2-opened #gdprbtn');
		case 'we-worldwide.com': return _sl('#cookieNotification[style*="block"] .js-cookie-allow');
		case 'echa.europa.eu': return _sl('#legal-notice-popup .primaryBTN');
		case 'ecb.europa.eu': return _sl('#cookieConsent:not(.hidden) .check.linkButton');
		case 're.jrc.ec.europa.eu': return _sl('#cookie-consent-banner .wt-cck-btn-add');
		case 'conradconnect.com': return _sl('.eu-cookie-compliance-banner .agree-button');
		case 'iriedaily.de': return _sl('#cc-modal[style*="block"] .cc-save');
		case 'apartmenttherapy.com': return _sl('.jw-popup-cookies .jw-button');
		case 'ganinex.com.pl': return _sl('body > div[id^="sil-global-vue"] .popup .footer a');
		case 'uktvplay.uktv.co.uk': return _sl('#app .cookie-consent .button.accept');
		case 'konbini.com': return _sl('.modal .cookies-consent-content .button.primary');
		case 'lescommis.com': return _sl('.modal.in[aria-labelledby="confirm-modal-label"] .btn-default');
		case 'sourceforge.net': return _sl('#cmpbox[style*="block"] .cmpboxbtnyes');
		case 'hasura.io': return _sl('#content > div > div > div > a[href*="privacy"] ~ img[alt*="Close"]');
		case 'traxmag.com': return _sl('.popin-overlay--cookie.show .btn.accept');
		case 'tirerack.com': return _sl('.modalContainer[style*="block"] button[onclick*="acceptTerms"]');
		case 'itsnicethat.com': return _sl('.fixed > .bg-mineshaft button.bg-sun');
		case 'pewdiepie.store': return _sl('#gatsby-focus-wrapper div[class*="CookiesNotification"] button');
		case 'openeducation.blackboard.com': return _sl('.CookieConsent #agree_button');
		case 'ae.com': return _sl('.modal-ccpa.ember-view .btn-accept-cookie, .overflow-hide .qa-btn-allow-cookie');
		case 'bytbil.com': return _sl('.uk-modal[style*="block"] #privacyModalAcceptBtn');
		case 'inshared.nl': return _sl('.modal[style*="block"] .cookie-settings__button-left');
		case 'pointblankmusicschool.com': return _sl('.fancybox-overlay[style*="block"] .accept[onclick*="cookieControl"]');
		case 'werkenbijpathe.nl': return _sl('.cookie-notification__button:last-child');
		case 'kempen.com': return _sl('.cookie-bar--is-visible .button[data-js-hook="accept-button"]:not([disabled])');
		case 'fichier-pdf.fr': return _sl('#ModalCookies[style*="block"] .btn');
		case 'wuestenrot.at': return _sl('.fancybox-overlay[style*="block"] .cookiePopup .button');
		case 'officiallondontheatre.com': return _sl('#cookie-consent > .open .mt3 > div:last-child a');
		case 'msg.group': return _sl('#jt-cookies-modal[style*="block"] .button-submit-default-cookies');
		case 'ferienwohnungen-ferienhaeuser-weltweit.de': return _sl('#Modal_Cookie_Hinweis[style*="block"] .btn[data-dismiss]');
		case 'elearningindustry.com': return _sl('#cookie-consent-modal[style*="block"] .btn-success');
		case 'plus.net': return _sl('#cookie-consent-modal[style*="block"] .cookie-button-save-default');
		case 'zolecka.pl': return _sl('#fancybox-wrap[style*="block"] #cookiePrivacyButton');
		case 'telekom-dienste.de': return _sl('.cookie-conf ~ .btn-primary');
		case 'mcdonalds.at': return _sl('.cc-bg .cc-allow');
		case 'jobnet.dk': return _sl('#StatCookieConsentDialog[style*="block"] #AcceptStatCookie');
		case 'allround-pc.com': return _sl('.open #apcTrackingAccept');
		case 'netze-bw.de': return _sl('#ndCookieConsent[style*="block"] #btnAcceptAllCookies');
		case 'meteo-parapente.com': return _sl('.rules-acceptation .prefered');
		case 'marktomarket.io': return _sl('#js-privacy-consent:not([style*="none"]) .btn--accept');
		case 'campingwiesenbek.de': return _sl('#cockieModal[style*="block"] .btn');
		case 'vvebelang.nl': return _sl('#cookieModal[style*="block"] #cookie-approve');
		case 'eboo.lu': return _id('cookie-authorize-btn');
		case 'opngo.com': return _sl('.cookie-banner-modal[style*="block"] .cookie-accept-all > div');
		case 'moteurnature.com': return _sl('.consentcontainer[style*="block"] #dw_accept_all');
		case 'nuxeo.com': return _sl('#cookie-inform-message:not([style*="none"]) .button');
		case 'campagne.krant.nl': return _sl('#CookieWall .wall .ButtonCta');
		case 'zappi.io': return _sl('.legal-wrapper .btn');
		case 'econt.com': return _sl('.gdpr-modal .btn[ng-click*="accept"]');
		case 'eversports.de': return _sl('#js_cookie-settings-modal[style*="block"] #selectAll');
		case 'thomas-krenn.com': return _sl('.btn[data-cookie-overlay-accept-all]');
		case 'jostchemical.com': return _sl('.privacy-banner button');
		case 'falter.at': return _sl('#cookieconsent:not(.hidden) .btn-default');
		case 'mcdirect.com': return _sl('#privacy-policy-root[style*="block"] .btn');
		case 'blackstonefootwear.com': return _sl('#cookiewall.is-open .cookiewall__accept');
		case 'eko-motorwear.com': return _sl('.featherlight[style*="block"] #accept_all_cookies');
		case 'smartloop.be': return _sl('#cookie_modal[style*="block"] .btn');
		case 'fleetyards.net': return _sl('.modal.show .panel-btn[data-test="accept-cookies"]');
		case 'ing.lu': return _sl('.cookieBar .btn-primary');
		case '180grader.dk': return _sl('.modal.show modal-cookie .btn-success');
		case 'kinopolis.de': return _sl('#consent[style*="block"] #accept-all-button');
		case 'mysimpleshow.com': return _sl('#overlay:not([style*="none"]) .slug-cookie-consent .ok');
		case 'credit-suisse.com': return _sl('.m-consent-manager-open .consent-cookie-accept-all');
		case 'neff-home.com': return _sl('.o-cookielaw[style*="block"] .js-accept');
		case 'the12volt.com': return _sl('#consent_form input[type="submit"][name="Accept"]');
		case 'infomaniak.com': return _sl('#ik-rgpd-container[style*="block"] .ik-rgpd__button--2');
		case 'e-shelter.de': return _sl('#sliding-popup .agree-button');
		case 'dailybuzz.nl': return _sl('.as-js-optin, #consent-bg[style*="block"] #accept');
		case 'universiteitleiden.nl': return _sl('.cookies-overlay ~ .cookies .accept');
		case 'icould.com': return _sl('#cookie-blackout-curtain:not(.hide) .gdpr-submit');
		case 'stryker.com': return _sl('.modal[style*="block"] .btn-yes-hcp-modal');
		case 'kivra.se': return _sl('#___gatsby div[class*="CookieSplash"] button[class*="accept"]');
		case 'bataclan.fr': return _sl('.mpp-popup[style*="block"] .mpp-element[data-cookieplus*="accept-cookies"]');
		case 'umcutrecht.nl': return _sl('#cookieConsent .button[data-cookie*="yes"]');
		case 'skb.si': return _sl('.cookiesSplash.open .cookiesSplashSaveAll');
		case '1blu.de': return _sl('.glightbox-open .mycookie-ok-btn');
		case 'phoenix.de': return _sl('.blured ~ .ng-scope[ng-if*="showPrivacySettings"] button');
		case 'refoweb.nl': return _sl('#cookieconsent button');
		case 'studienstiftung.de': return _sl('.modal[style*="block"] #CookieForm .btn-primary');
		case 'bol.com': return _sl('.modal[open] .consent-modal .js-confirm-button span, #__next button[class*="CookieModal"]:first-child, div[data-componentid*="cookie-popup"] button:first-child');
		case 'lektury.gov.pl': return _sl('.modal[style*="block"] .cookies-accept-btn');
		case 'hawle.de': return _sl('#cookie-notice[style*="block"] .btn[data-dismiss]');
		case 'pruadviser.co.uk': return _sl('#cookie-notice[style*="block"] .cookie--accept');
		case 'marc-o-polo.com': return _sl('#cookie-settings .cookie-settings__button--all');
		case 'omictools.com': return _sl('#cookie-policy-intro-dialog[style*="block"] .js-accept-all-intro');
		case 'vier-pfoten.de': return _sl('.modal[style*="block"] .module-privacy__accept');
		case 'mcl.de': return _sl('.js--mcl-accept-all-cookies');
		case 'etos.nl': return _sl('#cookie-modal.modal--is-showing .c-button--primary');
		case 'aucoffre.com': return _sl('.cookiesModal .btn-primary');
		case 'bazzar.hr': return _sl('.modal[style*="block"] .js-cookies-eu-ok');
		case 'player.fm': return _sl('.top-promo.legal-disclaimer .promo-accept');
		case 'hettalentenhuis.nl': return _sl('#cookie_bar .cookie-buttons button + button');
		case 'future-x.de': return _sl('#cookieBar[style*="block"] .buttonFTX');
		case 'cottonon.com': return _sl('#gdpr-policy-container #accept-cookies');
		case 'freudenberg.com': return _sl('.cookie-consent:not(.cookie-consent--hidden) .jsCookieAccept');
		case 'strawpoll.me': return _sl('body > div > [data-tracking-opt-in-overlay] [data-tracking-opt-in-accept]');
		case 'vodafone.de': return _sl('#dip-consent[style*="block"] .red-btn');
		case 'fega-schmitt.de': return _sl('.cookieWarning-container[style*="block"] .btn-accept');
		case 'astro.hr': return _sl('#privacy a[href*="gdpr_consent=accept"]');
		case 'audioboom.com': return _sl('div[id^="cookie-modal"] .modal[style*="block"] .btn.mrs');
		case 'wins.pl': return _sl('#cookies-modal[style*="block"] .close');
		case 'revistainforetail.com': return _sl('.modalCookies.in .btn');
		case 'arbeiterkammer.at': return _sl('.modal[style*="block"] .btn-accept-cookies');
		case 'flixwatch.co': return _sl('.wpca-show .wpca-btn-accept');
		case 'swietawdomu.pl': return _sl('#cf-root.cookiefirst-root button[data-cookiefirst-button="primary"]');
		case 'hanover.com': return _sl('#cookieSettingsModal[style*="block"] .btnAccept');
		case 'xsports.lv': return _sl('.notice-cookie #cookie_allow_button');
		case 'pvcvoordeel.nl': return _sl('.js-cookie-popup.visible .js-popup-close');
		case '511tactical.com': return _sl('#cookieModal[style*="block"] .accept-settings');
		case 'certideal.com': return _sl('.cookie-preferences-on #cookie-go');
		case 'patronite.pl': return _sl('.modal--container .modal__action > div');
		case 'gp-tuning.at': return _sl('#dsgvo-cookie-popup .accept');
		case 'weblager.dk': return _sl('.modal[style*="block"] .btn');
		case 'billomat.com': return _sl('.remodal-is-opened #privacy-accept-all');
		case 'antiquite-neuvillefranck.fr': return _id('sdgdpr_modal_buttons-agree');
		case 'thewinecellarinsider.com': return _sl('#tzPrivacyPolicyModal[style*="block"] #popup-close');
		case 'sparkassen-direkt.de': return _sl('#consent #sConsent');
		case 'zst-tarnow.pl': return _sl('#modal:not([style*="none"]) #agree');
		case 'kognitio.com': return _sl('.cookie-popup:not([style*="none"]) .cookie-close');
		case 'test-achats.be': return _sl('.mfp-ready #acceptAllCookiesTop');
		case 'huk24.de': return _sl('.cookie-consent__button--primary');
		case 'der-farang.com': return _sl('.consent_accept');
		case 'paz.de': return _sl('#cookieSelect[style*="block"] .btn-primary');
		case 'norwegianreward.com': return _sl('#modalDataConsent[style*="block"] .re-button--success');
		case 'mrgugu.com': return _sl('body > div > div > div[style*="bottom"] > button[aria-label="Zamknij"]');
		case 'metro.co.uk': return _sl('body > div[class^="app"][data-project="mol-fe-cmp"] button + button');
		case 'translit.net': return _sl('.tPechenkiButton');
		case 'vsninfo.de': return _sl('#cookiehinweis .accept');
		case 'superdrug.com': return _sl('#privacy[style*="block"] .privacy-policy-popup__ok-btn');
		case 'yoump3.app': return _sl('.notice-container[style*="block"] .accept');
		case 'zeoob.com': return _sl('#cookies_modal[style*="block"] .btn-success');
		case 'pocztapolska24.pl': return _sl('#terms-drop[style*="block"] #close-me');
		case 'budapestbank.hu': return _sl('#gdpr-consent-modal .btn--primary');
		case 'photovoltaik-shop.com': return _sl('.amgdprcookie-modal-container._show .-allow');
		case 'cupsell.pl': return _sl('.tingle-enabled .tingle-modal-box__footer .btn');
		case 'cloudhealthtech.com': return _sl('.gdpr-container .btn');
		case 'puressentiel.com': return _sl('.mfp-ready .popup-form-rgpd #btn-accepter');
		case 'roms-download.com': return _sl('.modal[style*="block"] .btn[onclick*="kuk"]');
		case 'sg-zertifikate.de': return _sl('.cookie-preferences .button-select-all');
		case 'bienwaldfitness.de': return _sl('#cookie_banner_modal[style*="block"] .btn-success');
		case 'store.leica-camera.com': return _sl('.js--modal.cookie--permission[style*="block"] .cc-dismiss');
		case 'jointhesale.nl': return _sl('.cookie-consent-button-accept');
		case 'matines.com': return _sl('.modal[style*="block"] .cookies .okbtn');
		case 'premiumkino.de': return _sl('.in .cookie-alert-modal-component .btn.center');
		case 'reidl.de': return _sl('.reveal-overlay[style*="block"] .cookies-zustimmen');
		case 'ocs.fr': return _sl('#rgpd-notice[style*="block"] #rgpd-notice-accept');
		case 'lm.be': return _sl('#cookiesmodal[style*="block"] #cookies-submit-all');
		case 'swipbox.com': return _sl('.modal[style*="block"] #coi-banner-wrapper #acceptAll');
		case '4gamers.be': return _sl('.popup #accept');
		case 'volber.de': return _sl('.modal[style*="block"] .btn[onclick*="setConsentAll"]');
		case 'themisbar.com': return _sl('.modal[style*="block"] .btn[onclick*="cookieConsent"]');
		case 'acerta.be': return _sl('#modal-cookie.active .btn[data-modal-all]');
		case 'contofacto.it': return _sl('.privacypp.open .confirm');
		case 'kawasaki.de': return _id('LinkButton_Agree');
		case 'halebop.se': return _sl('.cookie-banner-modal:not([style*="none"]) #btncookieconsent');
		case 'packback.co': return _sl('.cdk-overlay-container .cta-large-button');
		case 'markets.com': return _sl('.cookie-modal:not(.d-none) .cookies-accept-all');
		case 'bstbk.de': return _sl('#privacy.fx_layer-visible button[onclick*="confirm"]');
		case 'unikrn.com': return _sl('.cookie-notice-visible #cookie-notice button');
		case 'technikmuseum.berlin': return _sl('.close-cookiebanner');
		case 'telekom.hu': return _sl('#cookie_consent:not([style*="none"]) #accept_all_cookies');
		case 'rku-it.de': return _sl('#cookienotice:not([style*="none"]) #accept-cookie');
		case 'nouvelobs.com': return _sl('#cmp-popin[aria-hidden="false"] .cmp-popin__ok');
		case 'vom-achterhof.de': return _sl('.cookie--popup[style*="block"] .cookie--agree-btn');
		case 'surveytandem.com': return _sl('.popup[ng-show="consentPopup"] .btn');
		case 'eplan-software.com': return _sl('#cookie_container[style*="block"] button[data-module-acceptall]');
		case 'stapler.de': return _sl('.modal-dialog[style*="block"] #cookies-accept-all');
	}
	
	
	var parts = h.split('.');
	
	if (parts.length > 2)
	{
		parts.shift();
		return getE(parts.join('.'));
	}
	
	return false;
}


// Search loop function

const classname = Math.random().toString(36).replace(/[^a-z]+/g, '');
var timeoutDuration = 500;

function searchLoop(counter, host) {
	setTimeout(function() {
		var e = getE(host);
		
		if (e && e.className.indexOf(classname) == -1) {
			e.click();
			e.className += ' ' + classname;
			timeoutDuration += 1000;
		} else if (counter < 200)
			searchLoop(counter+1, host);
	}, timeoutDuration);
	
	timeoutDuration += 20;
}


// Initial timeout

(function() {
	var start = setInterval(function() {
		var html = document.querySelector('html');
		
		if (!html || html.className.indexOf(classname) !== -1)
			return;
		
		html.className += ' ' + classname;
		searchLoop(0, document.location.hostname.replace(/^w{2,3}\d*\./i, ''));
		clearInterval(start);
	}, 500);
})();