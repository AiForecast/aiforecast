import React from 'react';
import { JsonEditor } from 'json-edit-react'
import { useTheme } from 'next-themes'

export default function JsonThemeEditor({jsonobject} : {jsonobject: any}) {
  const { theme } = useTheme()
  if(theme === "light"){
    return (
        <JsonEditor data={ jsonobject } className="mx-auto" theme={"githubLight"}/>
    )
  }else{
    return (
        <JsonEditor data={ jsonobject } className="mx-auto" theme={"githubDark"}/>
    )
  }

}