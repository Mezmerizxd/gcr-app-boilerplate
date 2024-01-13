const cheerio = require('cheerio');

const html = `
<div class="gem-c-govspeak govuk-govspeak " data-module="govspeak" data-govspeak-module-started="true">
    <h3 id="in-this-section-3">In this section</h3>
    <ul>
        <li><a href="#section-1-4-1">1.4.1. Performance</a></li>
        <li><a href="#section-1-4-2">1.4.2. Efficiency</a></li>
    </ul>
    <hr>
    <h3 id="section-1-4-1">1.4.1. Performance</h3>
    <table>
        <thead>
            <tr>
                <th scope="col">Defect</th>
                <th scope="col">Category</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>(a) Parking brake inoperative on one side, or in the case of testing on the road, the vehicle deviates excessively from a straight line</td>
                <td>Major</td>
            </tr>
        </tbody>
    </table>
    <h3 id="section-1-4-2">1.4.2. Efficiency</h3>
    <table>
        <thead>
            <tr>
                <th scope="col">Defect</th>
                <th scope="col">Category</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>(a) Parking brake efficiency: <br><br>(i) below minimum requirement <br>(ii) less than 50% of the required value</td>
                <td>
                    <br><br>Major<br>Dangerous
                </td>
            </tr>
        </tbody>
    </table>
</div>
`;

// Load HTML into Cheerio
const $ = cheerio.load(html);

// Initialize the JSON structure
const jsonResult = {
  sections: [],
};

// Extract section information
$('h3[id^="section-"]').each((index, element) => {
  const sectionId = $(element).attr('id');
  const sectionName = $(element).text();
  const defects = [];

  /* Editing the sectionId, eg. `section-1-4-1`
   * 1. Remove the `section-` prefix
   * 2. Replace the remaining `-` with `.`
   */
  const sectionIdEdited = sectionId.replace('section-', '').replace(/-/g, '.');

  /* Editing the sectionName, eg. `1.4.1. Performance`
   * 1. Remove the `1.4.1.` prefix
   * 2. Replace the remaining `.` with ` `
   */
  const sectionNameEdited = sectionName
    .replace(/1\.4\.\d\./, '')
    .replace(/\./g, ' ')
    .trim();

  // Extract defects within the current section
  $(`#${sectionId} + table tbody tr`).each((defectIndex, defectElement) => {
    const defectName = $(defectElement).find('td:first-child').text().trim();
    const defectCategory = $(defectElement).find('td:last-child').text().trim().toLowerCase();

    /* Editing the defectName, eg. `(a) abc abc abc`
     * 1. Save the appropriate prefix, eg. `(a)` in defectNamePrefix, also remove the brackets
     * 2. Remove the `(a)` prefix
     */
    const defectNamePrefix = defectName.match(/^\(\w\)/)[0].replace(/\(|\)/g, '');
    const defectNameEdited = defectName.replace(/^\(\w\)\s/, '');

    /* 
    To be changed as we need to handle the defects
    with multiple prefixes, eg. `(a)(i)`
    If there are 2 options in deflect B I want the ids to be
     ['1.1.1.a', '1.1.1.b.i', '1.1.1.b.ii']

    CHECK THE ULTIMATE GOAL BELOW
    */
    // defects.push({
    //   id: `${sectionIdEdited}.${defectNamePrefix}`,
    //   name: defectNameEdited,
    //   category: defectCategory,
    // });

    /*
      We are going to check if defectName has any extra options inside
      We can tell by checking for brackets with 1 or more `i`'s inside
      If it does we need to add extra defects to the defects array
    */
    const defectNameHasExtraOptions = defectName.match(/\(\w+\)/g);

    if (defectNameHasExtraOptions) {
      // We need to remove the first option as we have already added it
      defectNameHasExtraOptions.shift();

      // Loop through the extra options
      defectNameHasExtraOptions.forEach((option) => {
        // Remove the brackets from the option
        const letters = option.replace(/\(|\)/g, '');

        // Now we need to find the name using the letters like (letters) name
        const name = $(`#${sectionId} + table tbody tr td:contains(${letters})`).text().trim();

        // Add the defect to the defects array
        defects.push({
          id: `${sectionIdEdited}.${defectNamePrefix}.${letters}`,
          name: name,
          category: defectCategory,
        });
      });
    } else {
      // If there are no extra options we can just add the defect to the defects array
      defects.push({
        id: `${sectionIdEdited}.${defectNamePrefix}`,
        name: defectNameEdited,
        category: defectCategory,
      });
    }
  });

  // Add the section to the JSON structure
  jsonResult.sections.push({
    id: sectionIdEdited,
    name: sectionNameEdited,
    defects: defects,
  });
});

// Print the resulting JSON
console.log(JSON.stringify(jsonResult, null, 2));

/*
#######################################################################
# The Ultimate Goal
# To be able to convert the HTML into the following JSON structure

{
  id: '1.1.2',
  name: 'Service brake pedal or hand lever condition and travel',
  description: null,
  defects: [
    {
      id: '1.1.2.a',
      name: 'Insufficient reserve travel',
      category: 'major',
    },
    {
      id: '1.1.2.b.i',
      name: 'Service brake control - not releasing correctly',
      category: 'minor',
    },
    {
      id: '1.1.2.b.ii',
      name: 'Service brake control - functionality of brakes affected',
      category: 'major',
    },
    {
      id: '1.1.2.c',
      name: 'Anti-slip provision missing, loose or worn smooth',
      category: 'major',
    },
  ],
},

#######################################################################
*/

const ultimateHtml = `
<div class="gem-c-govspeak govuk-govspeak " data-module="govspeak" data-govspeak-module-started="true">
    <h3 id="in-this-section">In this section</h3>
<ul>
  <li><a href="#section-1-1-1">1.1.1. Service brake pedal or hand lever pivot</a></li>
  <li><a href="#section-1-1-2">1.1.2. Service brake pedal or hand lever condition and travel</a></li>
  <li><a href="#section-1-1-3">1.1.3. Air and vacuum systems</a></li>
  <li><a href="#section-1-1-4">1.1.4. Low-pressure warning</a></li>
  <li><a href="#section-1-1-5">1.1.5. Hand operated brake control valve</a></li>
  <li><a href="#section-1-1-6">1.1.6. Parking brake lever or control</a></li>
  <li><a href="#section-1-1-7">1.1.7. Brake valves</a></li>
  <li>1.1.8. Not in use</li>
  <li><a href="#section-1-1-9">1.1.9. Pressure storage reservoirs</a></li>
  <li><a href="#section-1-1-10">1.1.10. Brake servo units and master cylinder (hydraulic systems)</a></li>
  <li><a href="#section-1-1-11">1.1.11. Rigid brake pipes</a></li>
  <li><a href="#section-1-1-12">1.1.12. Flexible brake hoses</a></li>
  <li><a href="#section-1-1-13">1.1.13. Brake linings and pads</a></li>
  <li><a href="#section-1-1-14">1.1.14. Brake discs and drums</a></li>
  <li><a href="#section-1-1-15">1.1.15. Brake cables, rods, levers and linkages</a></li>
  <li><a href="#section-1-1-16">1.1.16. Brake actuators - including spring brakes, hydraulic cylinders and callipers</a></li>
  <li><a href="#section-1-1-17">1.1.17. Load sensing valve</a></li>
  <li><a href="#section-1-1-18">1.1.18. Brake slack adjuster</a></li>
  <li><a href="#section-1-1-19">1.1.19. Additional braking device (retarder), if fitted</a></li>
  <li>1.1.20. Not in use</li>
  <li><a href="#section-1-1-21">1.1.21. Complete braking system</a></li>
</ul>
<hr>
<h3 id="section-1-1-1">1.1.1. Service brake pedal or hand lever pivot</h3>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Pivot too tight</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(b) Excessive wear or free play</td>
      <td>Major</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-2">1.1.2. Service brake pedal or hand lever condition and travel</h3>
<p>A brake pedal rubber is an anti-slip material and is therefore not regarded as a defect if it’s worn smooth.</p>
<p>A brake pedal without a rubber usually has grooves or raised sections to provide grip in wet conditions and should be rejected if it’s worn smooth. However, some vehicles may have been manufactured with a brake pedal which did not incorporate grooves or the fitting of an anti-slip material and these should not be rejected.</p>
<p>You should reject a brake pedal if its grooves or raised grip sections are worn smooth. However, you should not reject a brake pedal if the vehicle has been manufactured with one that does not have grooves or anti-slip material.</p>
<p>Often a vehicle is fitted with an aftermarket brake pedal rubber. It is not a defect if the design pattern of the brake pedal rubber is worn smooth.</p>
<p>A vehicle should only be failed for insufficient reserve if the pedal or lever is touching the floor/handlebar. Checks on vehicles with power-assisted braking systems should be carried out with the engine off.</p>
<p>It may be possible on motorcycle derived systems for the brake lever to touch the handlebar. In such cases the extent of reserve travel should be assessed during the brake test.</p>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Insufficient reserve travel</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(b) Service brake control:<br><br>(i) not releasing correctly<br>(ii) functionality of brakes affected</td>
      <td>
<br><br>Minor<br>Major</td>
    </tr>
    <tr>
      <td>(c) Anti-slip provision missing, loose or worn smooth</td>
      <td>Major</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-3">1.1.3. Air and vacuum systems</h3>
<p>Vehicles first used before 1 October 1937 do not need to be tested for air and vacuum systems.</p>
<p>A vehicle with an ULW up to and including 3,050kg, with a reservoir coupled direct to the induction manifold or a reservoir integral in a servo unit, does not need to be fitted with a warning device.</p>
<p>To check the build-up of air or vacuum:</p>
<ol class="steps">
<li>
<p>Completely empty the reservoir by repeatedly pressing the service brake pedal.</p>
</li>
<li>
<p>Start the engine and run it at just below the governed speed if diesel, or at 2,000rpm if petrol.</p>
</li>
<li>
<p>Check the time it takes for the warning device to stop operating. Pressure build-up is considered satisfactory if the warning device stops operating within:</p>
</li>
</ol>
<ul>
  <li>3 minutes for pressure systems</li>
  <li>1 minute for vacuum systems</li>
</ul>
<p>For checks that require reference to a pressure or vacuum gauge warning mark, but no warning mark is present, the following reference values should be used:</p>
<ul>
  <li>45psi (3.1kg/cm2 or 3 bar) for a pressure gauge</li>
  <li>10” to 12” (25 to 30cm) for a vacuum gauge</li>
</ul>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Insufficient pressure/vacuum assistance for less than:<br><br>(i) four brake applications after the warning device has operated (or gauge shows an unsafe reading)<br>(ii) two brake applications after warning device has operated (or gauge shows an unsafe reading)</td>
      <td>
<br><br>Major<br><br>Dangerous</td>
    </tr>
    <tr>
      <td>(b) Time taken to build up air pressure/vacuum to safe working value not in accordance with the requirements</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(c) Repeated operation of any ancillary air or vacuum system completely depletes the stored air or vacuum for the braking system</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(d) Air leak causing a noticeable drop in pressure or audible air leak</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(e) External damage likely to affect the function of the braking system</td>
      <td>Major</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-4">1.1.4. Low-pressure warning</h3>
<p>Vehicles first used before 1 October 1937 do not need to be tested for low-pressure warning.</p>
<p>A vehicle with an ULW up to and including 3,050kg with a reservoir coupled direct to the induction manifold or a reservoir integral in a servo unit, is not necessarily required to be fitted with a warning device.</p>
<p>Warning devices may be visual or audible but only one needs to work if both are fitted.</p>
<p>Some vehicles with full power hydraulic braking systems will illuminate the low-pressure warning light as soon as the ignition is switched on. It is not a defect unless the warning light stays on after the engine has been started.</p>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Low-pressure warning gauge or indicator:<br><br>(i) malfunctioning or defective<br>(ii) not identifying low-pressure</td>
      <td>
<br><br>Minor<br>Major</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-5">1.1.5. Hand operated brake control valve</h3>
<p>All vehicles with a secondary brake control - in addition to or in place of the normal parking brake lever - must be inspected.</p>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Control cracked, damaged or excessively worn</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(b) Control insecure on valve or valve insecure</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(c) Loose connections or leaks in the system</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(d) Malfunctioning</td>
      <td>Major</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-6">1.1.6. Parking brake lever or control</h3>
<p>Vehicles first used before 1906 do not need to have a parking brake.</p>
<p>Some defects in this sub-section may not apply to the type of parking brake fitted.</p>
<p>A parking brake lever must have obvious excessive travel before being rejected.</p>
<p>An electronic parking brake (EPB) may apply automatically in certain conditions, such as when the ignition is switched off or when the driver’s door is opened. Testers should be aware of this throughout the test.</p>
<p>Electronic parking brakes must be maintained in operation by direct mechanical means, even though they are applied electronically. However, the mechanism for keeping the brakes applied is usually within brake calliper or motor gear assembly and therefore not easy to see.</p>
<p>Hydraulic parking brakes as an only means of operation are not acceptable on vehicles first used on or after 1 January 1968. However, they may be used to assist the application or release of a mechanical brake.</p>
<p>Quadricycles may be fitted with one of the following types of parking brake:</p>
<ul>
  <li>an over-centre lever that is mounted on handlebars</li>
  <li>a gear lever that operates a cable when it’s moved into the park position</li>
  <li>a transmission lock, which is the ‘P’ position on machines with continuously variable transmission (CVT)</li>
</ul>
<p>These machines are type approved and should not be rejected for design features that prevent them from meeting the stated requirements.</p>
<p>If the parking brake is the ‘P’ position on the gearbox, the efficiency of the brake cannot be tested. The tester must therefore assess the brake by using a gradient (ideally 16%), or by attempting to push the machine when ‘P’ is selected.</p>
<p>The over-centre lever type can be brake tested as normal using one of the approved test methods.</p>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Ratchet not holding correctly</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(b) Parking brake lever pivot or ratchet mechanism:<br><br>(i) obviously worn <br>(ii) worn to the extent that the brake may inadvertently release</td>
      <td>
<br><br>Minor<br>Major</td>
    </tr>
    <tr>
      <td>(c) Parking brake lever has excessive movement indicating incorrect adjustment</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(d) Parking brake control missing, defective or inoperative</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(e) Electronic parking brake MIL indicates a malfunction</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(f) Parking brake is not capable of being maintained in operation by direct mechanical action only (vehicle first used on or after 1 January 1968)</td>
      <td>Major</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-7">1.1.7. Brake valves</h3>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Valve:<br><br>(i) damaged or excessive air leak <br>(ii) leaking such that brake functionality is affected</td>
      <td>
<br><br>Major<br>Dangerous</td>
    </tr>
    <tr>
      <td>(b) Excessive oil discharge from a compressor or brake valve</td>
      <td>Minor</td>
    </tr>
    <tr>
      <td>(c) Valve insecure or inadequately mounted</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(d) Hydraulic fluid: <br><br>(i) leak from a brake valve <br>(ii) leak from a brake valve such that brake functionality is affected</td>
      <td>
<br><br>Major<br>Dangerous</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-8">1.1.8. Not in use</h3>
<h3 id="section-1-1-9">1.1.9. Pressure storage reservoirs</h3>
<p>Vehicles first used on 1 October 1937 or later must have their air and air/hydraulic braking systems inspected.</p>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Reservoir: <br><br>(i) has minor damage or corrosion <br>(ii) heavily damaged, heavily corroded or leaking</td>
      <td>
<br><br>Minor<br>Major</td>
    </tr>
    <tr>
      <td>(b) Drain device on an air brake system: <br><br>(i) operation affected <br>(ii) inoperative</td>
      <td>
<br><br>Minor<br>Major</td>
    </tr>
    <tr>
      <td>(c) Reservoir insecure or inadequately mounted</td>
      <td>Major</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-10">1.1.10. Brake servo units and master cylinder (hydraulic systems)</h3>
<p>Hydraulic brake fluid level checks are confined to transparent reservoirs or where an indicator is fitted. Reservoir caps should not be removed.</p>
<p>A brake fluid warning lamp may be shared with other components, for example to indicate that brake pads are worn or the parking brake is applied. Class 3 vehicles are not inspected for brake fluid warning lamp.</p>
<p>To check the brake vacuum servo:</p>
<ol class="steps">
<li>
<p>Make sure the engine is switched off.</p>
</li>
<li>
<p>Deplete the stored vacuum by repeatedly applying the service brake.</p>
</li>
<li>
<p>Fully apply the brake and hold at a constant pressure.</p>
</li>
<li>
<p>Start the engine.</p>
</li>
<li>
<p>Note if the pedal can be felt to travel further.</p>
</li>
</ol>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Brake servo: <br><br>(i) defective or ineffective <br>(ii) inoperative</td>
      <td>
<br><br>Major<br>Dangerous</td>
    </tr>
    <tr>
      <td>(b) Master cylinder: <br><br>(i) defective but brake still operating <br>(ii) leaking</td>
      <td>
<br><br>Major<br>Dangerous</td>
    </tr>
    <tr>
      <td>(c) Master cylinder insecure</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(d) Brake fluid: <br><br>(i) below minimum mark <br>(ii) significantly below minimum mark <br>(iii) not visible</td>
      <td>
<br><br>Minor<br>Major<br>Dangerous</td>
    </tr>
    <tr>
      <td>(e) Master cylinder reservoir cap missing</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(f) Brake fluid warning light illuminated or defective</td>
      <td>Minor</td>
    </tr>
    <tr>
      <td>(g) Incorrect functioning of brake fluid level warning device</td>
      <td>Minor</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-11">1.1.11. Rigid brake pipes</h3>
<p>If the metal brake pipes have surface dirt that needs to be removed before it’s possible to assess their condition, you can lightly scrape the pipe with a specialist brake pipe corrosion tool or the corrosion assessment tool ‘spade end’. It must be done with care so that any protective coating does not get damaged.</p>
<p>Chafing, corrosion or damage to a rigid brake pipe so that its wall thickness is reduced by 1/3 (approximately 0.25mm for typical hydraulic brake pipe) justifies rejection, although it’s accepted that this is not easy to determine. If you are not sure whether the pipe is sufficiently deteriorated to justify rejection, you should give the benefit of the doubt.</p>
<p>Repairs to the pressure lines of hydraulic brake systems are unacceptable unless suitable connectors are used.  Compression joints of a type using separate ferrules are not suitable.</p>
<p>Unacceptable repairs to brake lines should be failed using RfR 1.1.21 (d)</p>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Brake pipe is at imminent risk of failure or fracture</td>
      <td>Dangerous</td>
    </tr>
    <tr>
      <td>(b) Leaking brake pipe or connection: <br><br>(i) on an air brake system <br>(ii) on a hydraulic system</td>
      <td>
<br><br>Major<br>Dangerous</td>
    </tr>
    <tr>
      <td>(c) Brake pipe damaged or excessively corroded</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(d) Brake pipe: <br><br>(i) inadequately clipped or supported <br>(ii) likely to become detached or damaged</td>
      <td>
<br><br>Minor<br>Major</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-12">1.1.12. Flexible brake hoses</h3>
<p>You should reject a hose for being excessively damaged or chafed only if it’s severe enough to expose the reinforcement.</p>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Brake hose damaged and likely to fail</td>
      <td>Dangerous</td>
    </tr>
    <tr>
      <td>(b) Flexible brake hose: <br><br>(i) slightly damaged, chafed or twisted <br>(ii) excessively damaged, deteriorated, chafed, twisted or stretched</td>
      <td>
<br><br>Minor<br>Major</td>
    </tr>
    <tr>
      <td>(c) Brake hoses or connections leaking on: <br><br>(i) air brake systems <br>(ii) hydraulic systems</td>
      <td>
<br><br>Major<br>Dangerous</td>
    </tr>
    <tr>
      <td>(d) Brake hose bulging under pressure</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(e) Brake hose porous</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(f) Brake hose ferrules: <br><br>(i) excessively corroded <br>(ii) excessively corroded and likely to fail</td>
      <td>
<br><br>Major<br>Dangerous</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-13">1.1.13. Brake linings and pads</h3>
<p>Some brake pads have metal wear indicators so that when the pads become excessively worn the metal indicator touches the disc making a squealing sound. Other pads may have a cut, which if worn away indicates that the pad must be replaced.</p>
<p>An illuminated brake wear indicator is not a reason for failure.</p>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Brake lining or pad: <br><br>(i) worn down to wear indicator <br>(ii) worn below 1.5mm</td>
      <td>
<br><br>Major<br>Dangerous</td>
    </tr>
    <tr>
      <td>(b) Brake lining or pad contaminated with oil, grease etc.</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(c) Brake lining or pad missing or incorrectly mounted</td>
      <td>Dangerous</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-14">1.1.14. Brake discs and drums</h3>
<p>A brake disc or drum must be significantly worn before you should reject it. Being worn below the manufacturer’s recommended limits is not a reason in itself.</p>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Brake disc or drum: <br><br>(i) significantly and obviously worn <br>(ii) insecure, fractured or otherwise likely to fail</td>
      <td>
<br><br>Major<br>Dangerous</td>
    </tr>
    <tr>
      <td>(b) Contaminated with oil, grease etc.</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(c) Missing</td>
      <td>Dangerous</td>
    </tr>
    <tr>
      <td>(d) Brake drum back plate insecure</td>
      <td>Major</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-15">1.1.15. Brake cables, rods, levers and linkages</h3>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Cable damaged or knotted</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(b) Component excessively worn or corroded</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(c) Cable, rod or joint insecure</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(d) Cable guide defective affecting operation</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(e) Restriction in free movement of the braking system</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(f) Abnormal movement of levers indicating maladjustment or excessive wear</td>
      <td>Major</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-16">1.1.16. Brake actuators - including spring brakes, hydraulic cylinders and callipers</h3>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Actuator cracked or damaged and: <br><br>(i) braking performance not affected <br>(ii) braking performance affected</td>
      <td>
<br><br>Major<br>Dangerous</td>
    </tr>
    <tr>
      <td>(b) Actuator leaking and: <br><br>(i) braking performance not affected <br>(ii) braking performance affected</td>
      <td>
<br><br>Major<br>Dangerous</td>
    </tr>
    <tr>
      <td>(c) Actuator insecure or inadequately mounted and: <br><br>(i) braking performance not affected <br>(ii) braking performance affected</td>
      <td>
<br><br>Major<br>Dangerous</td>
    </tr>
    <tr>
      <td>(d) Actuator: <br><br>(i) excessively corroded <br>(ii) excessively corroded and likely to crack</td>
      <td>
<br><br>Major<br>Dangerous</td>
    </tr>
    <tr>
      <td>(e) Actuator has: <br><br>(i) excessive travel of operating system indicating need for adjustment <br>(ii) no reserve travel and braking performance affected</td>
      <td>
<br><br>Major<br><br>Dangerous</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-17">1.1.17. Load sensing valve</h3>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Load sensing valve linkage defective</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(b) Load sensing valve linkage obviously incorrectly adjusted</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(c) Load sensing valve seized or inoperative and: <br><br>(i) ABS functioning <br>(ii) ABS not fitted or inoperative</td>
      <td>
<br><br>Major<br>Dangerous</td>
    </tr>
    <tr>
      <td>(d) Load sensing valve missing where fitted as standard</td>
      <td>Dangerous</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-18">1.1.18. Brake slack adjuster</h3>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Adjuster damaged, seized or having abnormal movement, excessive wear or incorrect adjustment</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(b) Adjuster defective</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(c) Incorrectly installed</td>
      <td>Major</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-19">1.1.19. Additional braking device (retarder), if fitted</h3>
<p>An endurance braking system, such as an exhaust brake or electronic retarder is only likely to be fitted to some large motor caravans and category M2 and M3 vehicles.</p>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Endurance braking system connectors or mountings: <br><br>(i) insecure <br>(ii) insecure and functionality affected</td>
      <td>
<br><br>Minor<br>Major</td>
    </tr>
    <tr>
      <td>(b) Endurance braking system obviously defective</td>
      <td>Major</td>
    </tr>
  </tbody>
</table>
<h3 id="section-1-1-20">1.1.20. Not in use</h3>
<h3 id="section-1-1-21">1.1.21. Complete braking system</h3>
<p>You must check the strength and continuity of the vehicle’s load bearing members and their supporting structure or panelling around any braking component mounting.</p>
<p>Guidance for assessing corrosion and use of the corrosion assessment tool can be found in Appendix A.</p>
<table>
  <thead>
    <tr>
      <th scope="col">Defect</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(a) Other braking system (e.g. antifreeze pump, air dryer etc.) component damaged or corroded: <br><br>(i) to the extent that the braking system is adversely affected <br>(ii) leaking and system functionality adversely affected</td>
      <td>
<br><br><br>Major<br>Dangerous</td>
    </tr>
    <tr>
      <td>(b) Air or antifreeze: <br><br>(i) leaking <br>(ii) to the extent that braking performance is affected</td>
      <td>
<br><br>Minor<br>Major</td>
    </tr>
    <tr>
      <td>(c) Any component insecure or inadequately mounted</td>
      <td>Major</td>
    </tr>
    <tr>
      <td>(d) Braking system component modification: <br><br>(i) unsafe <br>(ii) adversely affecting braking performance</td>
      <td>
<br><br>Major<br>Dangerous</td>
    </tr>
    <tr>
      <td>(e) The strength or continuity of the load bearing structure within 30cm of any braking system actuation component mounting (a prescribed area):<br><br>(i) is significantly reduced (see <a href="/guidance/mot-inspection-manual-for-private-passenger-and-light-commercial-vehicles/appendix-a-structural-integrity-and-corrosion">Appendix A</a>) <br>(ii) is so weakened that the functionality of the  braking system is affected</td>
      <td>
<br><br><br><br>Major<br>Dangerous</td>
    </tr>
  </tbody>
</table>
</div>
`;
