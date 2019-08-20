import { Animation } from '@ionic/core';

export function popOutAnimation(AnimationC: Animation, baseEl: HTMLElement): Promise<Animation> {

  const baseAnimation = new AnimationC();

  const backdropAnimation = new AnimationC();
  backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

  const wrapperAnimation = new AnimationC();
  const wrapperEl = baseEl.querySelector('.modal-wrapper');
  wrapperAnimation.addElement(wrapperEl);
  const wrapperElRect = wrapperEl!.getBoundingClientRect();

  wrapperAnimation
    .fromTo('transform', 'scaleX(1) scaleY(1)', 'translateX(0%) scaleX(0.9) scaleY(0.5)')
    .fromTo('opacity', 1, 1);

  backdropAnimation.fromTo('opacity', 0.4, 0.0);

  return Promise.resolve(baseAnimation
    .addElement(baseEl)
    .easing('ease-out')
    .duration(400)
    .add(backdropAnimation)
    .add(wrapperAnimation));

}
