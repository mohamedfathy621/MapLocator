Outfile "Run.exe"
RequestExecutionLevel admin
SilentInstall normal  ; Allow user interaction

Page directory        ; Let user choose an existing directory
Page instfiles        ; Show installation progress

Section
  SetOutPath "$INSTDIR"  ; Use user-selected existing folder

  ; Copy all files from "MyFolder" to the chosen directory
  File /r "out\*"

SectionEnd
