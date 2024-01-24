import {useEffect} from "react";
// @ts-ignore
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
export default function FeedbackWidget() {
  const {siteConfig} = useDocusaurusContext();
  const campaign = siteConfig.customFields.emojicomCampaign;
  useEffect(() => {
    // @ts-ignore
    window.emojicom_widget = { campaign };
    const script = document.createElement("script")
    script.src = "https://cdn.emojicom.io/embed/widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      // clean up the script when the component in unmounted
      document.body.removeChild(script)
    }
  }, [])

  return <div id="emojicom-widget-inline"></div>
}
