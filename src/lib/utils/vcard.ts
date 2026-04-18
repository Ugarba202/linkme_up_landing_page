export function generateVCard(profile: { fullName: string; username: string; bio: string; publicUrl: string }) {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.fullName}
N:${profile.fullName.split(' ').reverse().join(';')};;;
ORG:LinkMeUp
TITLE:${profile.bio.substring(0, 50)}
URL:${profile.publicUrl}
NOTE:Connected via LinkMeUp - ${profile.publicUrl}
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${profile.username}-contact.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
