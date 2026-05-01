using UnityEngine;

public class AnimationController : MonoBehaviour
{
    public Animator animator;

    public void PlayHappy()
    {
        animator.SetTrigger("Happy");
    }

    public void PlayWave()
    {
        animator.SetTrigger("HelloWave");
    }

    public void PlayAngry()
    {
        animator.SetTrigger("Angry");
    }
}