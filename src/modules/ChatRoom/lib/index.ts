import jpegIcon from '@/assets/icons/additional/jpegIcon.svg';
import { Message } from '@/modules/AdminInboxDisplay/lib/mock';

export const iconMap: { [P in string]: any } = {
  'image/jpeg': jpegIcon,
};

const mockFile = new File(['Content'], 'Diagram.jpg', {
  type: 'image/jpeg',
  lastModified: Date.now(),
});

export type SingleMessage = Omit<Message, 'starred'> & {
  senderEmail: string;
  recipientEmail: string;
  attachments: File[];
};

export const mockChat: SingleMessage[] = [
  {
    id: 17,
    threadId: 3,
    sender: 'Gandalf the Grey',
    senderEmail: 'gandalf@baldur.me',
    status: 'read',
    sentAt: 'Aug 26, 2023 (02:30)',
    recipientEmail: 'admin@example.com',
    title: 'Another "Miracle Elixir" for your consideration',
    message: `Geralt,

  Surely you jest! To claim that a simple poultice of powdered newt eyes and bat wings holds no magical properties is…well, frankly, insulting to the very fabric of reality!  Do you deny the undeniable hum of power that courses through a well-crafted spell? The way it can mend a broken bone or illuminate a path through the darkest night?
  
  Magic, my friend, is not some parlor trick for charlatans and fortune tellers. It is a tool, potent and profound, wielded by those who have dedicated themselves to its understanding.  In the right hands, it can be a force for immense good. Imagine, a world free from the backbreaking labor of harvest, where the land itself yields its bounty at a whispered command. Or think of the countless lives saved from illness by a timely magical cure!
  
  Perhaps your cynicism stems from a unfortunate encounter with a hedge wizard or two.  But surely you must recognize the potential for wonder that lies within the arcane arts?
  
  Let us not forget the times you yourself have benefited from a dab of magical ointment or a witcher’s potion brewed with a pinch of…unconventional ingredients.
  
  Come now, Geralt, shed that gruff exterior for a moment and embrace the fantastical!
  
  Sincerely,
  Gandalf
  `,
    attachments: [mockFile, mockFile],
  },
  {
    id: 18,
    threadId: 3,
    sender: 'Admin',
    senderEmail: 'admin@example.com',
    status: 'unread',
    sentAt: 'Aug 26, 2023 (02:30)',
    recipientEmail: 'gandalf@baldur.me',
    title: 'RE: Another "Miracle Elixir" for your consideration',
    message: `Gandalf,

    First, for the last time, it was a Doppler I dealt with, not a “hedge wizard.”  Second, the “ointment” you’re referring to likely contained a healthy dose of wolfsbane and grave dust – hardly high magic, more like glorified alchemy.
    
    As for your utopian dreamland conjured by flashy spells, have you considered the chaos such readily available power could unleash?  Men squabbling over spells like children fighting over toys, crops magically grown but devoid of any real character – sounds like a recipe for disaster to me.
    
    Honestly, a good, sharp sword and a witcher’s knowledge of the natural world tend to solve most problems just fine. That, and a healthy dose of skepticism towards anything that glows or levitates.
    
    Fireworks, you say? Now that’s something I might be interested in…but only if it doesn’t involve any pointy hats or chanting.
    
    Regards,
    
    Geralt
    
    P.S. If you ever need someone to dispose of a particularly nasty Djinn or a runaway griffin, you know who to call. Don’t expect any discounts for “entertainment value” though.`,
    attachments: [],
  },
];
