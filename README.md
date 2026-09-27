Indian_Gryffindor — Explainable AI for Diabetic Retinopathy Screening

SIH Problem ID: SIH26038
Team: Indian_Gryffindor
Theme: Healthcare / AI / Computer Vision
Focus: Early and explainable diabetic retinopathy screening for rural India

1. What are we trying to solve?

Diabetic retinopathy (DR) is one of the major complications of diabetes and can lead to permanent vision loss if it is not detected and treated on time.

The problem is not only that DR exists. The bigger problem is getting people screened early, especially in rural and underserved areas where access to ophthalmologists and specialized screening facilities is limited.

A patient may visit a rural health centre, get a retinal photograph taken, and still have no immediate access to an eye specialist.

So our idea is simple:

Use AI to screen retinal images at the primary healthcare level, identify patients who may have diabetic retinopathy, explain why the model made that decision, and guide the patient towards the next step.

The system is designed as a screening and referral-support system, not as a replacement for an ophthalmologist.

2. The problem in rural India

Rural screening creates some very practical problems:

Retinal images can be blurry, dark, overexposed or poorly framed.

Portable and non-mydriatic cameras can produce difficult images.

A significant number of images may be ungradable.

Rural health centres may not have an ophthalmologist available immediately.

Sending every patient to a specialist is expensive and time-consuming.

A black-box AI prediction is difficult for healthcare workers to trust.

A model that performs well on clean datasets may behave differently on real-world field images.

Our project therefore does not treat classification as the only problem.

We are looking at the complete screening process:

Image quality → Retinal screening → Disease grading → Explanation → Referral

3. Our proposed solution

We are building an Explainable AI based diabetic retinopathy screening system that can be used at the rural/PHC level.

The system will:

Take a retinal fundus image.

Check whether the image is good enough for analysis.

Give feedback when the image is not usable.

Process the usable image.

Detect signs associated with diabetic retinopathy.

Classify the image according to DR severity.

Show why the model reached its prediction.

Provide a confidence/calibration indication.

Generate a simple screening report.

Recommend whether the patient should continue routine screening or be referred for further examination.

The main idea is:

Do not just tell the healthcare worker what the AI thinks. Show them why it thinks so.

4. What the system looks at

The system is designed around clinically meaningful retinal structures and lesions.

Retinal structures

Optic disc

Fovea

Retinal blood vessels

DR-related findings

Microaneurysms

Exudates

Hemorrhages

Neovascularisation

These features help connect the model's prediction with visible changes in the retina.

5. Diabetic retinopathy grading

We plan to use the commonly used ICDR severity scale:

Level

Description

0

No apparent DR

1

Mild NPDR

2

Moderate NPDR

3

Severe NPDR

4

Proliferative DR

For screening, an important practical target is identifying referable disease, particularly Level 2 or above, so that patients who need further evaluation can be directed to an appropriate eye-care facility.

6. Image quality is a first-class part of the system

One of the biggest problems we identified is that an AI model cannot reliably diagnose an image that is itself unusable.

So instead of blindly sending every image to the classifier, our pipeline first performs fundus image quality assessment.

We look at things such as:

Focus / blur

Illumination

Field of view

Overall image usability

If the image is ungradable, the system should not simply produce a potentially misleading DR prediction.

Instead, it should give a practical message such as:

Image quality is insufficient. Please recapture the retinal image with better focus/lighting/positioning.

This makes the system more realistic for rural screening.

7. Image preprocessing

For usable retinal images, the preprocessing pipeline can include:

Illumination normalization

Contrast enhancement

CLAHE

Denoising

Image normalization

Standard resizing/cropping required by the model

The goal is not to make the image artificially perfect.

The goal is to reduce unnecessary variation caused by the camera and field conditions while preserving clinically useful retinal information.

8. Explainable AI

A major part of our project is explainability.

A normal classifier may output:

Moderate DR — 87% confidence

But this is not enough for a healthcare screening system.

Our system aims to additionally show where the model was looking and connect the prediction to retinal findings.

We plan to use:

Grad-CAM

Grad-CAM will be used to generate a visual explanation of the regions that contributed to the model's prediction.

For example, if the model predicts a higher DR severity, the explanation should ideally highlight retinal regions containing relevant abnormalities rather than unrelated parts of the image.

Lesion-level evidence

Where possible, the system will connect the prediction with findings such as:

Microaneurysms

Exudates

Hemorrhages

Neovascularisation

This makes the output easier to understand than a single probability value.

9. Confidence and calibration

A model saying 95% confidence does not automatically mean that the prediction is actually reliable.

Therefore, the project also considers confidence calibration.

The final screening output should communicate not only:

What did the model predict?

but also:

How reliable is this prediction?

This is especially important when the system is being used in a screening environment where a wrong prediction can affect whether someone gets referred.

10. Human-out-of-the-loop (HOTL) idea

A key part of our project thinking is the HOTL — Human-Out-of-the-Loop setting.

Instead of assuming that every prediction will be manually checked by an expert before the system can work, we want to investigate how the system behaves when it has to operate automatically.

This helps us study:

What happens when no ophthalmologist is immediately available?

How does image-quality rejection affect performance?

How does explainability help interpret automated predictions?

What happens when the model encounters difficult images?

How reliable is the system when operating with minimal human intervention?

The aim is not to remove doctors from healthcare.

The aim is to make the first-level screening process more useful in places where specialist access is limited.

11. Expected screening pipeline

        Retinal Fundus Image
                 |
                 v
       Image Quality Check
                 |
        +--------+--------+
        |                 |
     Ungradable         Usable
        |                 |
        v                 v
 Recapture Feedback   Preprocessing
                          |
                          v
                 DR Classification
                          |
                          v
                  Explainable AI
                  /           \
                 /             \
        Grad-CAM Evidence   Lesion Evidence
                 \             /
                  \           /
                   v         v
              Confidence / Calibration
                          |
                          v
                  Screening Report
                          |
                          v
               Referral Guidance

12. Technical approach

The project is being developed around a combination of computer vision, deep learning and explainable AI.

Core technologies

MATLAB — required for the SIH problem and used for the main modelling/prototyping workflow.

Simulink — considered for system/pipeline representation where appropriate.

Python / PyTorch — useful for experimentation, model development and dataset work.

FastAPI — planned backend/API layer.

MERN / Vite / Tailwind — planned web interface stack.

The exact implementation may evolve as the model and deployment pipeline are finalized.

13. Model development

Our current modelling direction uses transfer learning with modern image classification architectures.

One of our experiments used EfficientNet-B0.

An early experiment gave approximately:

Test Accuracy: 77.05%

F1 Score: 57.03%

Cohen's Kappa: 63.85%

These numbers are from an early-stage experiment and are not the final project results.

The next stage is to train and evaluate using the full available dataset with better handling of class imbalance and class-specific augmentation.

14. Dataset and training strategy

The project uses publicly available diabetic retinopathy retinal image datasets for model development and evaluation.

Our training strategy focuses on:

Using the full available training data

Handling class imbalance

Applying suitable augmentation

Using class-specific augmentation where needed

Separating training, validation and testing properly

Evaluating more than just accuracy

Important metrics include:

Accuracy

Precision

Recall / Sensitivity

Specificity

F1-score

Cohen's Kappa

Confusion matrix

Calibration / confidence behaviour

For a screening system, sensitivity is particularly important, because missing a patient with referable DR can be more serious than sending an additional patient for specialist evaluation.

15. Target performance

Our project target is:

>90% sensitivity

>85% specificity

for identifying referable diabetic retinopathy / Level 2+ disease.

These are target goals for the project, not claims about the current model performance.

16. Why explainability matters here

Imagine a healthcare worker gets two outputs:

Black-box output

Prediction: Severe DR
Confidence: 91%

Our intended output

Prediction: Severe DR
Confidence: High

Important regions:
[Grad-CAM heatmap]

Detected evidence:
- Retinal hemorrhage
- Abnormal vascular changes
- Other relevant retinal findings

Recommendation:
Refer for ophthalmic evaluation

The second output provides more information for the person using the system.

This is the direction we want to take with the project.

17. Rural-first design

We are designing the project around the reality of rural screening instead of assuming ideal hospital conditions.

Problems we are considering

Blur and poor focus

Portable cameras may produce blurred images.

Uneven illumination

Lighting conditions can vary between images and locations.

Poor field of view

The required retinal region may not be captured properly.

Limited specialist availability

The screening location may not have an ophthalmologist.

Low trust in black-box AI

A prediction without an explanation is difficult to interpret.

Unnecessary referrals

If every diabetic patient is referred, the system does not solve the access problem.

Our system therefore tries to improve both screening quality and referral efficiency.

18. Expected user flow

A simple version of the user workflow is:

Patient arrives at PHC
        ↓
Retinal image captured
        ↓
System checks image quality
        ↓
Image acceptable?
   ↙           ↘
 NO             YES
 ↓               ↓
Recapture       AI screening
                 ↓
          DR severity prediction
                 ↓
          Explainable evidence
                 ↓
          Screening report
                 ↓
        Referral / follow-up

The idea is to keep the interface simple enough that the healthcare worker does not need to understand deep learning to use it.

19. Dashboard / interface

The planned interface will focus on the information that actually matters during screening.

Possible output sections include:

Patient / screening information

Screening ID

Date/time

Basic patient information as appropriate

Image

Original retinal image

Processed retinal image

AI result

DR severity

Referable / non-referable screening indication

Confidence / calibrated confidence

Explanation

Grad-CAM visualization

Important retinal regions

Detected lesion evidence

Action

Routine follow-up

Recapture image

Refer for ophthalmic evaluation

The interface should avoid overwhelming the user with unnecessary technical information.

20. Expected impact

Primary impact

Earlier identification of diabetic retinopathy

Better access to screening in rural areas

Faster identification of patients who may require specialist attention

Reduced dependence on immediate specialist availability

More interpretable AI-assisted screening

Secondary impact

Better use of limited ophthalmology resources

Fewer unnecessary referrals

Better-quality retinal images through recapture feedback

Improved confidence in AI-assisted screening

Potential for deployment in PHCs and community screening programs

A framework that can be extended to other retinal screening problems

21. What makes our approach different

We are not trying to build only:

"Upload image → AI predicts DR."

Our focus is on building a more complete screening workflow:

"Capture → Check quality → Screen → Explain → Assess confidence → Report → Refer."

This matters because real-world screening is not the same as classification on a clean dataset.

22. Limitations we are aware of

This is still a prototype/research project, so there are important limitations.

Public datasets may not perfectly represent rural Indian populations.

Camera types and image quality can vary significantly.

A model trained on one dataset may not generalize perfectly to another.

Explainability maps such as Grad-CAM show model attention, but they are not a clinical proof of causation.

Lesion detection and DR grading are not equivalent to a full ophthalmic examination.

The system should not be treated as a replacement for a qualified ophthalmologist.

Real-world validation with clinically labelled images is still required before deployment.

Being explicit about these limitations is important for a healthcare AI system.

23. Future work

Possible future development includes:

Better image-quality assessment

More robust training across different camera conditions

Multi-dataset evaluation

Stronger class-imbalance handling

Lesion-specific detection/segmentation

Improved confidence calibration

Better Grad-CAM / explanation quality

External validation on unseen datasets

Real-world rural image testing

Lightweight deployment for low-resource environments

Integration with PHC screening workflows

Further investigation of HOTL operation

Clinical collaboration and validation

24. Project architecture

A high-level architecture is:

                    ┌─────────────────────┐
                    │  Retinal Camera     │
                    └──────────┬──────────┘
                               │
                               v
                    ┌─────────────────────┐
                    │ Image Quality Check │
                    └──────────┬──────────┘
                               │
                  ┌────────────┴────────────┐
                  │                         │
             Ungradable                  Usable
                  │                         │
                  v                         v
        Recapture Feedback          Preprocessing
                                            │
                                            v
                                  DR Classification
                                            │
                              ┌─────────────┴─────────────┐
                              │                           │
                              v                           v
                        DR Prediction              Explainability
                                                          │
                                             ┌────────────┴────────────┐
                                             │                         │
                                             v                         v
                                          Grad-CAM              Lesion Evidence
                                             │                         │
                                             └────────────┬────────────┘
                                                          │
                                                          v
                                             Confidence / Calibration
                                                          │
                                                          v
                                                Screening Report
                                                          │
                                                          v
                                                Referral Guidance

25. Repository structure

The repository is expected to gradually evolve into something similar to:

Indian_Gryffindor/
│
├── README.md
│
├── data/
│   └── README.md
│
├── matlab/
│   ├── preprocessing/
│   ├── quality_assessment/
│   ├── training/
│   ├── evaluation/
│   └── explainability/
│
├── python/
│   ├── training/
│   ├── preprocessing/
│   ├── evaluation/
│   └── utilities/
│
├── models/
│
├── backend/
│   └── FastAPI/
│
├── frontend/
│   └── web-app/
│
├── results/
│   ├── metrics/
│   ├── confusion_matrices/
│   └── explainability/
│
└── docs/
    ├── architecture/
    └── presentation/

The exact structure may change as development continues.

26. Development philosophy

The project is being built with an MVP-first approach.

We would rather have:

a working screening pipeline with a clear explanation

than:

a huge system with many features that do not work reliably.

The development priority is therefore:

Get retinal images into the system.

Check image quality.

Build a reliable DR classifier.

Evaluate it properly.

Add explainability.

Add confidence/calibration.

Build the screening report.

Connect everything into a simple interface.

Test the complete workflow.

27. Current project status

Completed / explored

Problem identified and scoped around rural DR screening.

End-to-end screening concept defined.

Image-quality assessment included as a core component.

ICDR 0–4 grading defined.

Referable DR target defined around Level 2+.

Explainability direction selected using Grad-CAM and lesion evidence.

Confidence/calibration included in the design.

HOTL operation considered as part of the research direction.

Initial EfficientNet-B0 experiment completed.

Initial evaluation produced ~77.05% test accuracy.

Full-dataset training and stronger augmentation are planned next.

MATLAB is included as a core requirement of the implementation.

Current focus

The immediate focus is moving from an initial model experiment to a more complete and robust pipeline:

Full Dataset
     ↓
Better Training
     ↓
Image Quality
     ↓
DR Classification
     ↓
Explainability
     ↓
Calibration
     ↓
Screening Report
     ↓
Web Interface

28. Team

Team Name

Indian_Gryffindor

SIH Problem

SIH26038 — Explainable AI for Diabetic Retinopathy Screening in Rural India

The project combines:

Biotechnology / healthcare understanding

Machine learning

Deep learning

Computer vision

Explainable AI

Web development

Healthcare-oriented system design

29. Final goal

The final goal is not simply to achieve a high number on a test dataset.

The goal is to demonstrate a practical concept for AI-assisted diabetic retinopathy screening in resource-limited settings.

A successful prototype should be able to take a retinal image, decide whether it is usable, screen it for DR, provide an understandable explanation, communicate the reliability of the prediction, and help guide the next screening/referral step.

In one line:

Making retinal screening more accessible, more explainable, and more useful where specialist access is limited.

30. Disclaimer

This project is a research/prototype system intended for diabetic retinopathy screening support.

It is not a medical device, diagnosis system, or replacement for examination by a qualified ophthalmologist.

Any real-world clinical deployment would require appropriate clinical validation, regulatory approval, data protection measures, and oversight by qualified healthcare professionals.

License

This section will be updated when the project license is finalized.
